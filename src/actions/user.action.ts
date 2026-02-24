'use server';

import { updateUserProfile } from '@/lib/dal/user';
import { requireAuthAPI } from '@/lib/session';
import { UpdateUserProfileValues, updateUserProfileSchema } from '@/lib/validation/user';

export async function updateUserProfileData(values: UpdateUserProfileValues) {
  const validatedValues = updateUserProfileSchema.parse(values);
  const { user } = await requireAuthAPI();

  const updatedUser = await updateUserProfile(user.id, validatedValues);
  return updatedUser;
}
