import { cache } from 'react'
import type { Notification } from '@/generated/prisma/client'
import prisma from '@/lib/prisma'
import { createNotification, deleteNotification } from './notification'

export const getFollowRelationship = cache((targetUserId: string, authenticatedUserId: string) => {
  return prisma.user.findUnique({
    where: { id: targetUserId },
    select: {
      followers: {
        where: { followerId: authenticatedUserId },
        select: { followerId: true },
        take: 1,
      },
      _count: {
        select: { followers: true, following: true },
      },
    },
  })
})

export function followUser(targetUserId: string, authenticatedUserId: string) {
  const followData = {
    followerId: authenticatedUserId,
    followingId: targetUserId,
  }

  return prisma.follow.upsert({
    where: { followerId_followingId: followData },
    create: followData,
    update: {},
  })
}

export function unfollowUser(targetUserId: string, authenticatedUserId: string) {
  return prisma.follow.deleteMany({
    where: { followerId: authenticatedUserId, followingId: targetUserId },
  })
}

export function followTransaction({
  issuerId,
  recipientId,
}: Pick<Notification, 'issuerId' | 'recipientId'>) {
  return prisma.$transaction([
    followUser(recipientId, issuerId),
    createNotification({ issuerId, recipientId, type: 'FOLLOW' }),
  ])
}

export function unfollowTransaction({
  issuerId,
  recipientId,
}: Pick<Notification, 'issuerId' | 'recipientId'>) {
  return prisma.$transaction([
    unfollowUser(recipientId, issuerId),
    deleteNotification({ issuerId, recipientId, type: 'FOLLOW' }),
  ])
}
