import { NextRequest } from 'next/server'
import { getNotificationsForUser } from '@/lib/dal/notification'
import { handleApiError } from '@/lib/errors'
import { buildCursorPaginatedByKey, getCursorPaginationParams } from '@/lib/server-api'
import { requireAuthAPI } from '@/lib/session'

export async function GET(req: NextRequest) {
  try {
    const { user } = await requireAuthAPI()
    const { cursor, pageSize } = getCursorPaginationParams(req)

    const notifications = await getNotificationsForUser({
      recipientId: user.id,
      cursor,
      pageSize,
    })

    return Response.json(
      buildCursorPaginatedByKey({
        key: 'notifications',
        items: notifications,
        pageSize,
      }),
    )
  } catch (error) {
    return handleApiError(error)
  }
}
