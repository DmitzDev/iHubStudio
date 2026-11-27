import crypto from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';
import type { AuthUser, UserRole } from '@ihub/shared';
import { env } from '../config/env.js';
import { repositories } from '../repositories/index.js';
import { AppError } from './errorHandler.js';

interface TokenPayload {
  sub: string;
  role: UserRole;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function signAuthToken(user: AuthUser): string {
  const payload: TokenPayload = {
    sub: user.id,
    role: user.role,
    exp: Date.now() + 1000 * 60 * 60 * 24, // 24h
  };
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = crypto
    .createHmac('sha256', env.AUTH_SECRET)
    .update(encoded)
    .digest('base64url');
  return `${encoded}.${signature}`;
}

export function verifyAuthToken(token: string): TokenPayload | null {
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return null;

  const expected = crypto
    .createHmac('sha256', env.AUTH_SECRET)
    .update(encoded)
    .digest('base64url');

  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(encoded, 'base64url').toString('utf8')
    ) as TokenPayload;
    if (!parsed.sub || !parsed.exp || parsed.exp < Date.now()) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export async function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      throw new AppError(401, 'UNAUTHORIZED', 'Authentication is required.');
    }

    const token = header.slice('Bearer '.length).trim();
    const payload = verifyAuthToken(token);
    if (!payload) {
      throw new AppError(401, 'INVALID_TOKEN', 'Session token is invalid or expired.');
    }

    const user = await repositories.users.findById(payload.sub);
    if (!user) {
      throw new AppError(401, 'UNAUTHORIZED', 'User account no longer exists.');
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

export function requireRole(...allowedRoles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError(401, 'UNAUTHORIZED', 'Authentication is required.'));
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(
        new AppError(
          403,
          'FORBIDDEN',
          `Role "${req.user.role}" does not have permission for this action.`
        )
      );
      return;
    }

    next();
  };
}
