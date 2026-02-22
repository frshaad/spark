'use server';

import { createComment } from '@/lib/dal/comment';
import { requireAuthAPI } from '@/lib/session';
import type { CommentRecord, PostRecord } from '@/lib/types';
import { type CommentInput, commentSchema } from '@/lib/validation/comment';

export async function submitComment(
  post: PostRecord,
  input: CommentInput,
): Promise<CommentRecord> {
  const session = await requireAuthAPI();

  const validatedComment = commentSchema.parse(input);

  const newComment = await createComment({
    authorId: session.user.id,
    postId: post.id,
    content: validatedComment.content,
  });

  return newComment;
}
