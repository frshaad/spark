import { handleApiError } from '@/lib/errors'
import { requireAuthAPI } from '@/lib/session'
import { createToken } from '@/lib/stream'

export async function GET() {
  try {
    const { user } = await requireAuthAPI()

    console.log('Calling get-token for user: ', user.id)

    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60
    const issuedAt = Math.floor(Date.now() / 1000) - 60
    const token = createToken(user.id, expirationTime, issuedAt)

    return Response.json({ token })
  } catch (error) {
    return handleApiError(error)
  }
}
