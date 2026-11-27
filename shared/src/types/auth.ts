export type UserRole = 'superadmin' | 'admin' | 'officer' | 'visitor';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}
