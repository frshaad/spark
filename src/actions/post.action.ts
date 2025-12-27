'use server';

import { createPost } from '@/lib/dal/post';
import { getServerSession } from '@/lib/session';
import { createPostSchema } from '@/lib/validation/post';

export async function submitPost(input: string) {
  const session = await getServerSession();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const { content } = createPostSchema.parse({ content: input });
  const post = await createPost(session.user.id, content);
  return post;
}
