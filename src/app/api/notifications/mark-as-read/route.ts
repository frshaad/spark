import { markNotificationsRead } from '@/lib/dal/notification'
import { handleApiError } from '@/lib/errors'
import { requireAuthAPI } from '@/lib/session'

export async function PATCH() {
  try {
    const { user } = await requireAuthAPI()

    await markNotificationsRead(user.id)

    return new Response()
  } catch (error) {
    handleApiError(error)
  }
}
