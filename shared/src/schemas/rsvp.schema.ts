import { z } from 'zod';

export const rsvpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters.')
    .max(100, 'Full name must be 100 characters or fewer.'),
  email: z
    .string()
    .trim()
    .email('Enter a valid email address.')
    .max(150, 'Email must be 150 characters or fewer.'),
  yearAndProgram: z
    .string()
    .trim()
    .max(100, 'Year & program must be 100 characters or fewer.')
    .optional()
    .or(z.literal('')),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;
