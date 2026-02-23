import prisma from '@/lib/prisma';
import { type CommentRecord, buildCommentInclude } from '@/lib/types';

export async function createComment(data: {
  authorId: string;
  postId: string;
  content: string;
}) {
  return prisma.comment.create({
    data,
    include: buildCommentInclude(data.authorId),
  });
}

export async function getPaginatedComments({
  postId,
  authenticatedUserId,
  cursor,
  pageSize,
}: {
  postId: string;
  authenticatedUserId: string;
  cursor: string | undefined;
  pageSize: number;
}): Promise<CommentRecord[]> {
  return prisma.comment.findMany({
    where: { postId, author: { username: { not: null } } },
    include: buildCommentInclude(authenticatedUserId),
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    take: pageSize + 1,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
  });
}

export async function findCommentById(id: string) {
  return prisma.comment.findUnique({
    where: { id },
  });
}

export async function deleteCommentById(id: string, viewerId: string) {
  return prisma.comment.delete({
    where: { id },
    include: buildCommentInclude(viewerId),
  });
}
