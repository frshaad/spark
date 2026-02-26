'use server'

import type { PostView } from '@/lib/types'
import type { CreatePostInputs } from '@/lib/validation/post'
import { createPost, deletePost as deletePostById, findPostByIdFull } from '@/lib/dal/post'
import { ForbiddenError, NotFoundError } from '@/lib/errors'
import { requireAuthAPI } from '@/lib/session'
import { createPostSchema } from '@/lib/validation/post'

export async function submitPost(input: CreatePostInputs): Promise<PostView> {
  const session = await requireAuthAPI()

  const validatedInputs = createPostSchema.parse(input)
  const newPost = await createPost(session.user.id, validatedInputs)
  return newPost as PostView
}

export async function deletePost(postId: string): Promise<PostView> {
  const session = await requireAuthAPI()

  const post = await findPostByIdFull(postId)
  if (!post) throw new NotFoundError()

  if (post.authorId !== session.user.id) throw new ForbiddenError()

  const deletedPost = await deletePostById(post.id, session.user.id)
  return deletedPost as PostView
}
