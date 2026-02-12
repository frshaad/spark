import { cache } from 'react';
import prisma from '@/lib/prisma';

export const getUserFollowersSummary = cache(
  (targetUserId: string, authenticatedUserId: string) => {
    return prisma.user.findUniqueOrThrow({
      where: { id: targetUserId },
      select: {
        followers: {
          where: { followerId: authenticatedUserId },
          select: { followerId: true },
          take: 1,
        },
        _count: {
          select: { followers: true },
        },
      },
    });
  },
);
