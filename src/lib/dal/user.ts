import { cache } from 'react';
import prisma from '@/lib/prisma';
import { getUserDataSelect } from '@/lib/types';

export const usersToFollow = cache(async (userId: string) => {
  return prisma.user.findMany({
    where: { NOT: { id: userId } },
    select: getUserDataSelect(userId),
    take: 5,
  });
});
