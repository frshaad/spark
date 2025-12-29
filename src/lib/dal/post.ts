import { cache } from 'react';
import { PostGetPayload, PostInclude } from '@/generated/prisma/models';
import prisma from '@/lib/prisma';

const postDataInclude = {
  author: {
    select: {
      username: true,
      displayUsername: true,
      image: true,
    },
  },
} satisfies PostInclude;

export type PostData = PostGetPayload<{
  include: typeof postDataInclude;
}>;

export const getPosts = cache(async () => {
  return await prisma.post.findMany({
    include: postDataInclude,
    orderBy: { createdAt: 'desc' },
  });
});

export async function createPost(authorId: string, content: string) {
  return prisma.post.create({
    data: { content, authorId },
  });
}
