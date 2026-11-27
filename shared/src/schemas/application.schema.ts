import { z } from 'zod';

export const APPLICATION_TRACKS = [
  'Software & Web',
  'Visual & Brand Design',
  'Media & Production',
  'Community & Events',
] as const;

export const applicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters.')
    .max(100, 'Full name must be 100 characters or fewer.'),
  schoolEmail: z
    .string()
    .trim()
    .email('Enter a valid school email address.')
    .max(150, 'Email must be 150 characters or fewer.'),
  yearAndProgram: z
    .string()
    .trim()
    .min(2, 'Please enter your year level and program/strand.')
    .max(120, 'Year level & program must be 120 characters or fewer.'),
  primaryTrack: z.enum(APPLICATION_TRACKS, {
    errorMap: () => ({ message: 'Select a primary studio track.' }),
  }),
  portfolioUrl: z
    .string()
    .trim()
    .url('Enter a valid URL starting with https:// or http://')
    .optional()
    .or(z.literal('')),
  statement: z
    .string()
    .trim()
    .min(20, 'Please write at least 20 characters about what you want to build or learn.')
    .max(1000, 'Statement must be 1000 characters or fewer.'),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
