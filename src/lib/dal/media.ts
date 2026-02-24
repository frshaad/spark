import { Media } from '@/generated/prisma/client'
import prisma from '@/lib/prisma'

export async function createMediaRecord(data: Pick<Media, 'url' | 'type'>) {
  return prisma.media.create({ data })
}

export async function getUnusedMediaUploads() {
  return prisma.media.findMany({
    where: {
      postId: null,
      ...(process.env.NODE_ENV === 'production'
        ? { createdAt: { lte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }
        : {}),
    },
    select: {
      id: true,
      url: true,
    },
  })
}

export async function deleteUnusedMediaRecords(mediaRecords: Pick<Media, 'url' | 'id'>[]) {
  return prisma.media.deleteMany({
    where: {
      id: { in: mediaRecords.map((m) => m.id) },
    },
  })
}
