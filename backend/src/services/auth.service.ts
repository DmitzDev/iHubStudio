import type {
  AuthUser,
  LoginInput,
  LoginResponse,
  RegisterVisitorInput,
  UserRole,
} from '@ihub/shared';
import { AppError } from '../middleware/errorHandler.js';
import { signAuthToken } from '../middleware/auth.js';
import { repositories } from '../repositories/index.js';
import {
  hashPassword,
  verifyPassword,
} from '../repositories/memory/MemoryUserRepository.js';

export class AuthService {
  async login(input: LoginInput): Promise<LoginResponse> {
    const stored = await repositories.users.findByEmail(input.email);
    if (!stored || !verifyPassword(input.password, stored.passwordHash)) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password.');
    }

    const { passwordHash: _ignored, ...user } = stored;
    const token = signAuthToken(user);
    return { token, user };
  }

  async registerVisitor(input: RegisterVisitorInput): Promise<LoginResponse> {
    const existing = await repositories.users.findByEmail(input.email);
    if (existing) {
      throw new AppError(
        409,
        'EMAIL_EXISTS',
        'An account with this email already exists.'
      );
    }

    const user = await repositories.users.create({
      name: input.name,
      email: input.email,
      passwordHash: hashPassword(input.password),
      role: 'visitor',
    });

    const token = signAuthToken(user);
    return { token, user };
  }

  async listUsers(): Promise<AuthUser[]> {
    return repositories.users.findAll();
  }

  async updateUserRole(
    targetUserId: string,
    role: UserRole,
    actorUserId: string
  ): Promise<AuthUser> {
    if (targetUserId === actorUserId && role !== 'superadmin') {
      throw new AppError(
        400,
        'CANNOT_DEMOTE_SELF',
        'Superadmin cannot remove their own superadmin role.'
      );
    }

    const updated = await repositories.users.updateRole(targetUserId, role);
    if (!updated) {
      throw new AppError(404, 'USER_NOT_FOUND', 'Target user was not found.');
    }
    return updated;
  }
}

export const authService = new AuthService();
