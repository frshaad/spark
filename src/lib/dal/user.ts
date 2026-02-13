import { cache } from 'react';
import prisma from '@/lib/prisma';
import { buildUserSelect } from '@/lib/types';

export const usersToFollow = cache(async (userId: string) => {
  return prisma.user.findMany({
    where: { NOT: { id: userId } },
    select: buildUserSelect(userId),
    take: 5,
  });
});
