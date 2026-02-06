'use server';

import {
  createPost,
  deletePost as deletePostById,
  getPost,
} from '@/lib/dal/post';
import { getServerSession } from '@/lib/session';
import { PostData } from '@/lib/types';
import { createPostSchema } from '@/lib/validation/post';

export async function submitPost(input: string): Promise<PostData> {
  const session = await getServerSession();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const { content } = createPostSchema.parse({ content: input });
  const newPost = await createPost(session.user.id, content);
  return newPost as PostData;
}

export async function deletePost(postId: string): Promise<PostData> {
  const session = await getServerSession();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const post = await getPost(postId);

  if (!post) {
    throw new Error('Post not found');
  }

  if (post.authorId !== session.user.id) {
    throw new Error('Unauthorized');
  }

  const deletedPost = await deletePostById(post.id);
  return deletedPost as PostData;
}
