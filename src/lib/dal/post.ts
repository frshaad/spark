import { cache } from 'react';
import prisma from '@/lib/prisma';
import { PostRecord, buildPostInclude } from '@/lib/types';

export const getPost = cache((id: string) => {
  return prisma.post.findUnique({
    where: { id },
  });
});

export const getForYouFeedPosts = cache(
  async ({
    authenticatedUserId,
    cursor,
    pageSize = 10,
  }: {
    authenticatedUserId: string;
    cursor: string | undefined;
    pageSize: number | undefined;
  }): Promise<PostRecord[]> => {
    return prisma.post.findMany({
      include: buildPostInclude(authenticatedUserId),
      orderBy: { createdAt: 'desc' },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
    });
  },
);

export const getFollowingFeedPosts = cache(
  ({
    authenticatedUserId,
    cursor,
    pageSize = 10,
  }: {
    authenticatedUserId: string;
    cursor: string | undefined;
    pageSize: number | undefined;
  }) => {
    return prisma.post.findMany({
      where: {
        author: {
          followers: {
            some: { followerId: authenticatedUserId },
          },
        },
      },
      include: buildPostInclude(authenticatedUserId),
      orderBy: { createdAt: 'desc' },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
    });
  },
);

export const getUserPosts = cache(
  async ({
    userId,
    cursor,
    pageSize = 10,
  }: {
    userId: string;
    cursor: string | undefined;
    pageSize: number | undefined;
  }): Promise<PostRecord[]> => {
    return prisma.post.findMany({
      where: { authorId: userId },
      include: buildPostInclude(userId),
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
    include: buildPostInclude(authorId),
  });
}
export async function deletePost(postId: string, authenticatedUserId: string) {
  return prisma.post.delete({
    where: { id: postId },
    include: buildPostInclude(authenticatedUserId),
  });
}
