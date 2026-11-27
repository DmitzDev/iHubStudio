import type { NextFunction, Request, Response } from 'express';
import type {
  ApiSuccessResponse,
  AuthUser,
  LoginInput,
  LoginResponse,
  RegisterVisitorInput,
  UpdateUserRoleInput,
} from '@ihub/shared';
import { authService } from '../services/auth.service.js';

export async function login(
  req: Request<unknown, unknown, LoginInput>,
  res: Response<ApiSuccessResponse<LoginResponse>>,
  next: NextFunction
): Promise<void> {
  try {
    const result = await authService.login(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function registerVisitor(
  req: Request<unknown, unknown, RegisterVisitorInput>,
  res: Response<ApiSuccessResponse<LoginResponse>>,
  next: NextFunction
): Promise<void> {
  try {
    const result = await authService.registerVisitor(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function me(
  req: Request,
  res: Response<ApiSuccessResponse<AuthUser>>,
  next: NextFunction
): Promise<void> {
  try {
    res.json({ success: true, data: req.user! });
  } catch (err) {
    next(err);
  }
}

export async function listUsers(
  _req: Request,
  res: Response<ApiSuccessResponse<AuthUser[]>>,
  next: NextFunction
): Promise<void> {
  try {
    const users = await authService.listUsers();
    res.json({ success: true, data: users, meta: { total: users.length } });
  } catch (err) {
    next(err);
  }
}

export async function updateUserRole(
  req: Request<{ id: string }, unknown, UpdateUserRoleInput>,
  res: Response<ApiSuccessResponse<AuthUser>>,
  next: NextFunction
): Promise<void> {
  try {
    const updated = await authService.updateUserRole(
      req.params.id,
      req.body.role,
      req.user!.id
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}
