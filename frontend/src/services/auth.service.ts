import type {
  AuthUser,
  HealthStatus,
  LoginInput,
  LoginResponse,
  RegisterVisitorInput,
  UserRole,
} from '@ihub/shared';
import { apiRequest } from './apiClient';

export const authService = {
  login(payload: LoginInput): Promise<LoginResponse> {
    return apiRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  registerVisitor(payload: RegisterVisitorInput): Promise<LoginResponse> {
    return apiRequest<LoginResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  me(): Promise<AuthUser> {
    return apiRequest<AuthUser>('/auth/me');
  },

  listUsers(): Promise<AuthUser[]> {
    return apiRequest<AuthUser[]>('/users');
  },

  updateUserRole(userId: string, role: UserRole): Promise<AuthUser> {
    return apiRequest<AuthUser>(`/users/${encodeURIComponent(userId)}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  },

  getHealth(): Promise<HealthStatus> {
    return apiRequest<HealthStatus>('/health');
  },
};
