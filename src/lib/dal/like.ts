import prisma from '@/lib/prisma';

export async function likePost(postId: string, authenticatedUserId: string) {
  const likeData = {
    postId,
    userId: authenticatedUserId,
  };

  return prisma.like.upsert({
    where: {
      userId_postId: likeData,
    },
    create: likeData,
    update: {},
  });
}

export async function dislikePost(postId: string, authenticatedUserId: string) {
  return prisma.like.deleteMany({
    where: { postId, userId: authenticatedUserId },
  });
}
