import { cache } from 'react';
import prisma from '@/lib/prisma';
import { postDataInclude } from '@/lib/types';

export const getPost = cache((id: string) => {
  return prisma.post.findUnique({
    where: { id },
  });
});

export const getPosts = cache(async () => {
  return prisma.post.findMany({
    include: postDataInclude,
    orderBy: { createdAt: 'desc' },
  });
});

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
