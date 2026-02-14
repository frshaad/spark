import { cache } from 'react';
import prisma from '@/lib/prisma';

export const getFollowRelationship = cache(
  (targetUserId: string, authenticatedUserId: string) => {
    return prisma.user.findUnique({
      where: { id: targetUserId },
      select: {
        followers: {
          where: { followerId: authenticatedUserId },
          select: { followerId: true },
          take: 1,
        },
        _count: {
          select: { followers: true, following: true },
        },
      },
    });
  },
);

export async function followUser(
  targetUserId: string,
  authenticatedUserId: string,
) {
  const followData = {
    followerId: authenticatedUserId,
    followingId: targetUserId,
  };

  return prisma.follow.upsert({
    where: { followerId_followingId: followData },
    create: followData,
    update: {},
  });
}

export async function unfollowUser(
  targetUserId: string,
  authenticatedUserId: string,
) {
  return prisma.follow.deleteMany({
    where: { followerId: authenticatedUserId, followingId: targetUserId },
  });
}
