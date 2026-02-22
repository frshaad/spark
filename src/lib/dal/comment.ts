import prisma from '@/lib/prisma';
import { CommentRecord, buildCommentInclude } from '@/lib/types';

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
    where: { postId },
    include: buildCommentInclude(authenticatedUserId),
    orderBy: { createdAt: 'asc' },
    take: -pageSize - 1,
    cursor: cursor ? { id: cursor } : undefined,
  });
}
