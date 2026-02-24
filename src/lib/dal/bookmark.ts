import prisma from '@/lib/prisma';
import { buildPostInclude } from '@/lib/types';

export async function getBookmarkInfo(postId: string, authenticatedUserId: string) {
  return prisma.bookmark.findUnique({
    where: {
      userId_postId: {
        postId,
        userId: authenticatedUserId,
      },
    },
  });
}

export async function bookmarkPost(postId: string, authenticatedUserId: string) {
  const bookmarkData = {
    postId,
    userId: authenticatedUserId,
  };

  return prisma.bookmark.upsert({
    where: {
      userId_postId: bookmarkData,
    },
    create: bookmarkData,
    update: {},
  });
}

export async function deleteBookmark(postId: string, authenticatedUserId: string) {
  return prisma.bookmark.deleteMany({
    where: { postId, userId: authenticatedUserId },
  });
}

export async function getBookmarkedPosts({
  authenticatedUserId,
  cursor,
  pageSize = 10,
}: {
  authenticatedUserId: string;
  cursor: string | undefined;
  pageSize: number | undefined;
}) {
  return prisma.bookmark.findMany({
    where: { userId: authenticatedUserId },
    include: {
      post: { include: buildPostInclude(authenticatedUserId) },
    },
    orderBy: { createdAt: 'desc' },
    take: pageSize + 1,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
  });
}
