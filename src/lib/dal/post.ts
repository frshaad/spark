import { cache } from 'react';
import prisma from '@/lib/prisma';
import { postDataInclude } from '@/lib/types';

export const getPosts = cache(async () => {
  return prisma.post.findMany({
    include: postDataInclude,
    orderBy: { createdAt: 'desc' },
  });
});

export async function createPost(authorId: string, content: string) {
  return prisma.post.create({
    data: { content, authorId },
  });
}
