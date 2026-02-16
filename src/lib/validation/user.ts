import * as z from 'zod';
import { nameSchema } from './base';

export const updateUserProfileSchema = z.object({
  displayName: nameSchema,
  bio: z.string().max(1000, 'Bio must be less than 1000 characters'),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;
