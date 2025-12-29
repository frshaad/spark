import { cache } from 'react';
import prisma from '@/lib/prisma';
import { userDataSelect } from '@/lib/types';

export const usersToFollow = cache(async (userId: string) => {
  return prisma.user.findMany({
    where: { NOT: { id: userId } },
    select: userDataSelect,
    take: 5,
  });
});
