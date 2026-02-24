import { deleteUnusedMediaRecords, getUnusedMediaUploads } from '@/lib/dal/media'
import { deleteUnusedMediaFromStorage } from '@/lib/dal/uploadthing'
import { handleApiError } from '@/lib/errors'

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', {
        status: 401,
      })
    }

    const unusedMediaUploads = await getUnusedMediaUploads()

    await Promise.all([
      deleteUnusedMediaFromStorage(unusedMediaUploads),
      deleteUnusedMediaRecords(unusedMediaUploads),
    ])

    return Response.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
