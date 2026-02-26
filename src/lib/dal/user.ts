import { cache } from 'react'
import type { UserRecord } from '@/lib/types'
import type { UpdateUserProfileValues } from '@/lib/validation/user'
import prisma from '@/lib/prisma'
import { buildUserSelect } from '@/lib/types'

export const getUsersToFollow = cache(async (userId: string) => {
  return prisma.user.findMany({
    where: {
      NOT: { id: userId },
      followers: { none: { followerId: userId } },
    },
    select: buildUserSelect(userId),
    take: 5,
  })
})

export const findUser = cache(async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
  })
})

export const getUserByUsername = cache(
  async (username: string, authenticatedUserId: string): Promise<UserRecord | null> => {
    return prisma.user.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } },
      select: buildUserSelect(authenticatedUserId),
    })
  },
)

export async function updateAvatar(authenticatedUserId: string, imageUrl: string) {
  return prisma.user.update({
    where: { id: authenticatedUserId },
    data: { image: imageUrl },
  })
}

export async function updateUserProfile(userId: string, data: UpdateUserProfileValues) {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: buildUserSelect(userId),
  })
}

export async function deleteUserAvatar(userId: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { image: null },
  })
}
