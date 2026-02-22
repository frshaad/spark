'use server';

import { createComment } from '@/lib/dal/comment';
import { requireAuthAPI } from '@/lib/session';
import type { CommentRecord, PostRecord } from '@/lib/types';
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

  const newComment = await createComment({
    authorId: session.user.id,
    postId: post.id,
    content: validatedComment.content,
  });

  return newComment;
}
