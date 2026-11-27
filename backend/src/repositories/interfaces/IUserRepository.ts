import type { AuthUser, UserRole } from '@ihub/shared';

export interface StoredUser extends AuthUser {
  passwordHash: string;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<StoredUser | null>;
  findById(id: string): Promise<AuthUser | null>;
  findAll(): Promise<AuthUser[]>;
  create(input: {
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
  }): Promise<AuthUser>;
  updateRole(id: string, role: UserRole): Promise<AuthUser | null>;
}
