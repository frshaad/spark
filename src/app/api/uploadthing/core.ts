import { type FileRouter, createUploadthing } from 'uploadthing/next'
import { UTApi, UploadThingError } from 'uploadthing/server'
import type { Media } from '@/generated/prisma/client'
import { createMediaRecord } from '@/lib/dal/media'
import { updateAvatar } from '@/lib/dal/user'
import { getSession } from '@/lib/session'

const f = createUploadthing()

export const appFileRouter = {
  avatar: f({
    image: {
      maxFileSize: '512KB',
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await getSession()
      if (!session) throw new UploadThingError('Unauthorized')
      return { user: session.user }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const oldAvatarUrl = metadata.user.image
      if (oldAvatarUrl) {
        const key = oldAvatarUrl.split('/f/')[1]
        await new UTApi().deleteFiles(key)
      }

      await updateAvatar(metadata.user.id, file.ufsUrl)

      return { avatarUrl: file.ufsUrl }
    }),
  attachment: f({
    image: { maxFileSize: '4MB', maxFileCount: 5 },
    video: { maxFileSize: '64MB', maxFileCount: 5 },
  })
    .middleware(async () => {
      const session = await getSession()
      if (!session) throw new UploadThingError('Unauthorized')
      return {}
    })
    .onUploadComplete(async ({ file }) => {
      const data = {
        url: file.ufsUrl,
        type: file.type.startsWith('image') ? 'IMAGE' : 'VIDEO',
      } satisfies Pick<Media, 'url' | 'type'>

      const media = await createMediaRecord(data)

      return { mediaId: media.id }
    }),
} satisfies FileRouter

export type AppFileRouter = typeof appFileRouter
