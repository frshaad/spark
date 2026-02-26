import { notFound } from 'next/navigation'
import { cache } from 'react'
import type { PostGetPayload, PostSelect } from '@/generated/prisma/models'
import type { PostRecord, PostView } from '@/lib/types'
import type { CreatePostInputs } from '@/lib/validation/post'
import { NotFoundError } from '@/lib/errors'
import prisma from '@/lib/prisma'
import { buildPostInclude } from '@/lib/types'

export const findPostByIdFull = cache(async (id: string) => {
  return prisma.post.findUnique({
    where: { id },
  })
})

export const findPostById = cache(
  async <T extends PostSelect>(
    id: string,
    select: T,
  ): Promise<PostGetPayload<{ select: T }> | null> => {
    return prisma.post.findUnique({
      where: { id },
      select,
    })
  },
)

export const findPostWithViewer = cache(async (id: string, viewerId: string) => {
  return prisma.post.findUnique({
    where: { id },
    include: buildPostInclude(viewerId),
  })
})

export async function getPostOrFail(id: string, viewerId: string): Promise<PostView> {
  const post = await findPostWithViewer(id, viewerId)

  if (!post) {
    throw new NotFoundError('Post not found')
  }

  return post as PostView
}

export async function getPostOrThrow(id: string, viewerId: string): Promise<PostView> {
  const post = await findPostWithViewer(id, viewerId)

  if (!post) notFound()

  return post as PostView
}

export const getForYouFeedPosts = cache(
  async ({
    authenticatedUserId,
    cursor,
    pageSize = 10,
  }: {
    authenticatedUserId: string
    cursor: string | undefined
    pageSize: number | undefined
  }): Promise<PostRecord[]> => {
    return prisma.post.findMany({
      include: buildPostInclude(authenticatedUserId),
      orderBy: { createdAt: 'desc' },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
    })
  },
)

export const getFollowingFeedPosts = cache(
  ({
    authenticatedUserId,
    cursor,
    pageSize = 10,
  }: {
    authenticatedUserId: string
    cursor: string | undefined
    pageSize: number | undefined
  }) => {
    return prisma.post.findMany({
      where: {
        author: {
          followers: {
            some: { followerId: authenticatedUserId },
          },
        },
      },
      include: buildPostInclude(authenticatedUserId),
      orderBy: { createdAt: 'desc' },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
    })
  },
)

export const getUserPosts = cache(
  async ({
    userId,
    cursor,
    pageSize = 10,
  }: {
    userId: string
    cursor: string | undefined
    pageSize: number | undefined
  }): Promise<PostRecord[]> => {
    return prisma.post.findMany({
      where: { authorId: userId },
      include: buildPostInclude(userId),
      orderBy: { createdAt: 'desc' },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
    })
  },
)

export async function createPost(authorId: string, data: CreatePostInputs) {
  const { content, mediaIds } = data

  return prisma.post.create({
    data: {
      content: content || '',
      authorId,
      attachments: {
        connect: mediaIds ? mediaIds.map(id => ({ id })) : [],
      },
    },
    include: buildPostInclude(authorId),
  })
}

export async function deletePost(postId: string, authenticatedUserId: string) {
  return prisma.post.delete({
    where: { id: postId },
    include: buildPostInclude(authenticatedUserId),
  })
}
