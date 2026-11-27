import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type {
  AuthUser,
  LoginInput,
  RegisterVisitorInput,
} from '@ihub/shared';
import { AUTH_TOKEN_KEY } from '../services/apiClient';
import { authService } from '../services/auth.service';

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (input: LoginInput) => Promise<AuthUser>;
  registerVisitor: (input: RegisterVisitorInput) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }

    authService
      .me()
      .then((current) => {
        setUser(current);
      })
      .catch(() => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const result = await authService.login(input);
    localStorage.setItem(AUTH_TOKEN_KEY, result.token);
    setUser(result.user);
    return result.user;
  }, []);

  const registerVisitor = useCallback(async (input: RegisterVisitorInput) => {
    const result = await authService.registerVisitor(input);
    localStorage.setItem(AUTH_TOKEN_KEY, result.token);
    setUser(result.user);
    return result.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, registerVisitor, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
