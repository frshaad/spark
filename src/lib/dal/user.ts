import { cache } from 'react';
import prisma from '@/lib/prisma';
import { UserRecord, buildUserSelect } from '@/lib/types';
import { UpdateUserProfileValues } from '@/lib/validation/user';

export const getUsersToFollow = cache(async (userId: string) => {
  return prisma.user.findMany({
    where: {
      NOT: { id: userId },
      followers: { none: { followerId: userId } },
    },
    select: buildUserSelect(userId),
    take: 5,
  });
});

export const getUserByUsername = cache(
  async (username: string, authenticatedUserId: string): Promise<UserRecord | null> => {
    return prisma.user.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } },
      select: buildUserSelect(authenticatedUserId),
    });
  },
);

export async function updateAvatar(authenticatedUserId: string, imageUrl: string) {
  return prisma.user.update({
    where: { id: authenticatedUserId },
    data: { image: imageUrl },
  });
}

// export async function deletePreviousAvatar(userId: string) {
//   return prisma.
// }

export async function updateUserProfile(userId: string, data: UpdateUserProfileValues) {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: buildUserSelect(userId),
  });
}
