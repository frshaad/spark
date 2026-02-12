import { cache } from 'react';
import prisma from '@/lib/prisma';
import { postDataInclude } from '@/lib/types';

export const getPost = cache((id: string) => {
  return prisma.post.findUnique({
    where: { id },
  });
});

export const getFeedPostsPage = cache(
  (cursor: string | undefined, pageSize: number) => {
    return prisma.post.findMany({
      include: postDataInclude,
      orderBy: { createdAt: 'desc' },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
    });
  },
);

export async function createPost(authorId: string, content: string) {
  return prisma.post.create({
    data: { content, authorId },
    include: postDataInclude,
  });
}
export async function deletePost(id: string) {
  return prisma.post.delete({
    where: { id },
    include: postDataInclude,
  });
}
