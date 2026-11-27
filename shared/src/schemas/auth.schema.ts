import { z } from 'zod';

export const USER_ROLES = ['superadmin', 'admin', 'officer', 'visitor'] as const;

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export const registerVisitorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(100, 'Name must be 100 characters or fewer.'),
  email: z
    .string()
    .trim()
    .email('Enter a valid email address.')
    .max(150, 'Email must be 150 characters or fewer.'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters.')
    .max(100, 'Password must be 100 characters or fewer.'),
});

export const updateUserRoleSchema = z.object({
  role: z.enum(USER_ROLES),
});

export const createProjectSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9-]+$/, 'Slug must contain lowercase letters, numbers, and hyphens only.'),
  title: z.string().trim().min(3).max(120),
  summary: z.string().trim().min(10).max(240),
  track: z.enum(['Engineering', 'Design', 'Media', 'Research']),
  status: z.enum(['Active', 'Completed', 'Archived']).default('Active'),
  semester: z.string().trim().min(3).max(60),
  featured: z.boolean().default(false),
  coverCaption: z.string().trim().min(5).max(200),
  aspectRatio: z.enum(['16:9', '4:3', '1:1']).default('16:9'),
  problem: z.string().trim().min(10).max(1000),
  solution: z.string().trim().min(10).max(1000),
  tools: z.array(z.string().trim().min(1)).min(1),
});

export const updateProjectSchema = createProjectSchema.partial();

export const createEventSchema = z.object({
  title: z.string().trim().min(3).max(140),
  description: z.string().trim().min(10).max(500),
  date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD date format.'),
  time: z.string().trim().min(3).max(60),
  venue: z.string().trim().min(2).max(120),
  track: z.enum([
    'Software & Web',
    'Visual & Brand Design',
    'Media & Production',
    'Community & Events',
  ]),
  capacity: z.coerce.number().int().min(1).max(500),
  isUpcoming: z.boolean().default(true),
});

export const updateEventSchema = createEventSchema.partial();

export const createAnnouncementSchema = z.object({
  title: z.string().trim().min(3).max(140),
  body: z.string().trim().min(10).max(600),
  category: z.enum(['General', 'Recruitment', 'Workshop', 'Release']),
  pinned: z.boolean().default(false),
});

export const createMemberSchema = z.object({
  name: z.string().trim().min(2).max(100),
  role: z.string().trim().min(2).max(100),
  committee: z.enum(['Executive', 'Engineering', 'Design', 'Media']),
  program: z.string().trim().min(2).max(100),
  yearLevel: z.string().trim().min(2).max(40),
  bio: z.string().trim().min(10).max(300),
  isOfficer: z.boolean().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterVisitorInput = z.infer<typeof registerVisitorSchema>;
export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>;
export type CreateMemberInput = z.infer<typeof createMemberSchema>;
