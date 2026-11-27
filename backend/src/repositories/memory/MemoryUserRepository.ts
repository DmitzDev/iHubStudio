import crypto from 'node:crypto';
import type { AuthUser, UserRole } from '@ihub/shared';
import type { IUserRepository, StoredUser } from '../interfaces/IUserRepository.js';

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, expectedHex] = storedHash.split(':');
  if (!salt || !expectedHex) return false;
  const derived = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHex, 'hex');
  if (derived.length !== expected.length) return false;
  return crypto.timingSafeEqual(derived, expected);
}

function toPublicUser(user: StoredUser): AuthUser {
  const { passwordHash: _ignored, ...publicUser } = user;
  return publicUser;
}

function resolveSeedPassword(envKey: string): string {
  const configured = process.env[envKey];
  if (configured && configured.length >= 6) {
    return configured;
  }
  return crypto.randomBytes(16).toString('base64url');
}

export class MemoryUserRepository implements IUserRepository {
  private readonly users: StoredUser[] = [
    {
      id: 'usr-superadmin',
      name: 'Bea Santos',
      email: 'superadmin@ihubstudio.org',
      role: 'superadmin',
      passwordHash: hashPassword(resolveSeedPassword('SEED_SUPERADMIN_PASSWORD')),
      createdAt: '2026-08-01T08:00:00Z',
    },
    {
      id: 'usr-admin',
      name: 'Marco Villanueva',
      email: 'admin@ihubstudio.org',
      role: 'admin',
      passwordHash: hashPassword(resolveSeedPassword('SEED_ADMIN_PASSWORD')),
      createdAt: '2026-08-05T08:00:00Z',
    },
    {
      id: 'usr-officer',
      name: 'Clarisse Tan',
      email: 'officer@ihubstudio.org',
      role: 'officer',
      passwordHash: hashPassword(resolveSeedPassword('SEED_OFFICER_PASSWORD')),
      createdAt: '2026-08-10T08:00:00Z',
    },
    {
      id: 'usr-visitor',
      name: 'Campus Visitor',
      email: 'visitor@ihubstudio.org',
      role: 'visitor',
      passwordHash: hashPassword(resolveSeedPassword('SEED_VISITOR_PASSWORD')),
      createdAt: '2026-09-01T08:00:00Z',
    },
  ];

  async findByEmail(email: string): Promise<StoredUser | null> {
    const normalized = email.trim().toLowerCase();
    const found = this.users.find((u) => u.email.toLowerCase() === normalized);
    return found ? { ...found } : null;
  }

  async findById(id: string): Promise<AuthUser | null> {
    const found = this.users.find((u) => u.id === id);
    return found ? toPublicUser(found) : null;
  }

  async findAll(): Promise<AuthUser[]> {
    return this.users.map(toPublicUser);
  }

  async create(input: {
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
  }): Promise<AuthUser> {
    const user: StoredUser = {
      id: `usr-${crypto.randomBytes(4).toString('hex')}`,
      name: input.name,
      email: input.email.trim().toLowerCase(),
      role: input.role,
      passwordHash: input.passwordHash,
      createdAt: new Date().toISOString(),
    };
    this.users.push(user);
    return toPublicUser(user);
  }

  async updateRole(id: string, role: UserRole): Promise<AuthUser | null> {
    const target = this.users.find((u) => u.id === id);
    if (!target) return null;
    target.role = role;
    return toPublicUser(target);
  }
}
