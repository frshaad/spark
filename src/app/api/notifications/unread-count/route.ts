import type { NotificationCountInfo } from '@/lib/types'
import { getNotificationUnreadCount } from '@/lib/dal/notification'
import { handleApiError } from '@/lib/errors'
import { requireAuthAPI } from '@/lib/session'

export async function GET() {
  try {
    const { user } = await requireAuthAPI()

    const unreadCount = await getNotificationUnreadCount(user.id)
    const data: NotificationCountInfo = { unreadCount }

    return Response.json(data)
  } catch (error) {
    handleApiError(error)
  }
}
