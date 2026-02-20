import { cache } from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { PostRecord, PostView, buildPostInclude } from '@/lib/types';
import { CreatePostInputs } from '@/lib/validation/post';

export const findPostById = cache(async (id: string) => {
  return prisma.post.findUnique({
    where: { id },
  });
});

export const getPostOrThrow = cache(async (id: string, viewerId: string) => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: buildPostInclude(viewerId),
  });

  if (!post) notFound();

  return post as PostView;
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

export async function createPost(authorId: string, data: CreatePostInputs) {
  const { content, mediaIds } = data;

  return prisma.post.create({
    data: {
      content: content || '',
      authorId,
      attachments: {
        connect: mediaIds ? mediaIds.map((id) => ({ id })) : [],
      },
    },
    include: buildPostInclude(authorId),
  });
}
export async function deletePost(postId: string, authenticatedUserId: string) {
  return prisma.post.delete({
    where: { id: postId },
    include: buildPostInclude(authenticatedUserId),
  });
}
