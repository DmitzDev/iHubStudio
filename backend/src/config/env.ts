import crypto from 'node:crypto';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  AUTH_SECRET: z.string().min(16).optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

if (parsed.data.NODE_ENV === 'production' && !parsed.data.AUTH_SECRET) {
  console.error('AUTH_SECRET environment variable is required in production.');
  process.exit(1);
}

export const env = {
  ...parsed.data,
  AUTH_SECRET:
    parsed.data.AUTH_SECRET ?? crypto.randomBytes(32).toString('hex'),
};
