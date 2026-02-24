'use server';

import type { CommentRecord, CommentView, PostRecord } from '@/lib/types';
import { commentTransaction, deleteCommentById, findCommentById } from '@/lib/dal/comment';
import { ForbiddenError, NotFoundError } from '@/lib/errors';
import { requireAuthAPI } from '@/lib/session';
import { commentSchema } from '@/lib/validation/comment';

export async function submitComment({
  content,
  post,
}: {
  post: PostRecord;
  content: string;
}): Promise<CommentRecord> {
  const session = await requireAuthAPI();

  const validatedComment = commentSchema.parse({ content });

  const [newComment] = await commentTransaction({
    postId: post.id,
    content: validatedComment.content,
    issuerId: session.user.id,
    recipientId: post.authorId,
  });

  return newComment;
}

export async function deleteComment(commentId: string): Promise<CommentView> {
  const session = await requireAuthAPI();

  const comment = await findCommentById(commentId);
  if (!comment) throw new NotFoundError('Comment not found');

  if (comment.authorId !== session.user.id)
    throw new ForbiddenError('You are not authorized to delete this comment.');

  const deletedComment = await deleteCommentById(comment.id, session.user.id);
  return deletedComment as CommentView;
}
