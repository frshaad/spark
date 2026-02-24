import { Notification } from '@/generated/prisma/client'
import prisma from '@/lib/prisma'
import { createNotification, deleteNotification } from './notification'

export function likePost(postId: string, authenticatedUserId: string) {
  const likeData = {
    postId,
    userId: authenticatedUserId,
  }

  return prisma.like.upsert({
    where: { userId_postId: likeData },
    create: likeData,
    update: {},
  })
}

export function dislikePost(postId: string, authenticatedUserId: string) {
  return prisma.like.deleteMany({
    where: { postId, userId: authenticatedUserId },
  })
}

export function likePostTransaction({
  issuerId,
  recipientId,
  postId,
}: Omit<Pick<Notification, 'issuerId' | 'postId' | 'recipientId'>, 'postId'> & {
  postId: NonNullable<Notification['postId']>
}) {
  return prisma.$transaction([
    likePost(postId, issuerId),
    ...(issuerId !== recipientId
      ? [createNotification({ issuerId, recipientId, postId, type: 'LIKE' })]
      : []),
  ])
}

export function unlikePostTransaction({
  issuerId,
  recipientId,
  postId,
}: Omit<Pick<Notification, 'issuerId' | 'postId' | 'recipientId'>, 'postId'> & {
  postId: NonNullable<Notification['postId']>
}) {
  return prisma.$transaction([
    dislikePost(postId, issuerId),
    deleteNotification({ issuerId, recipientId, postId, type: 'LIKE' }),
  ])
}
