'use server';

import {
  createPost,
  deletePost as deletePostById,
  getPost,
} from '@/lib/dal/post';
import { ForbiddenError, NotFoundError } from '@/lib/errors';
import { requireUserApi } from '@/lib/session';
import { PostView } from '@/lib/types';
import { createPostSchema } from '@/lib/validation/post';

export async function submitPost(input: string): Promise<PostView> {
  const session = await requireUserApi();

  const { content } = createPostSchema.parse({ content: input });
  const newPost = await createPost(session.user.id, content);
  return newPost as PostView;
}

export async function deletePost(postId: string): Promise<PostView> {
  const session = await requireUserApi();

  const post = await getPost(postId);
  if (!post) throw new NotFoundError();

  if (post.authorId !== session.user.id) throw new ForbiddenError();

  const deletedPost = await deletePostById(post.id, session.user.id);
  return deletedPost as PostView;
}
