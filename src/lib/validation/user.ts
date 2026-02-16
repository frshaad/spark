import * as z from 'zod';
import { nameSchema } from './base';

export const updateUserProfileSchema = z.object({
  displayName: nameSchema,
  bio: z.string().max(250, 'Bio must be less than 250 characters'),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;
