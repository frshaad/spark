import { UTApi } from 'uploadthing/server'
import type { Media } from '@/generated/prisma/client'

export async function deleteUnusedMediaFromStorage(
  unusedMediaUploads: Pick<Media, 'id' | 'url'>[],
) {
  await new UTApi().deleteFiles(unusedMediaUploads.map(m => m.url.split('/f/')[1]))
}
