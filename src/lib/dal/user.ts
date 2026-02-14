import { cache } from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { buildUserSelect } from '@/lib/types';

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

export const getUser = cache(
  async (username: string, authenticatedUserId: string) => {
    const user = await prisma.user.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } },
      select: buildUserSelect(authenticatedUserId),
    });
    if (!user) notFound();
    return user;
  },
);
