import prisma from '@/lib/prisma';

export async function getBookmarkInfo(
  postId: string,
  authenticatedUserId: string,
) {
  return prisma.bookmark.findUnique({
    where: {
      userId_postId: {
        postId,
        userId: authenticatedUserId,
      },
    },
  });
}

export async function bookmarkPost(
  postId: string,
  authenticatedUserId: string,
) {
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

export async function deleteBookmark(
  postId: string,
  authenticatedUserId: string,
) {
  return prisma.bookmark.deleteMany({
    where: { postId, userId: authenticatedUserId },
  });
}
