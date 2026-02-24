import { getUserByUsername } from '@/lib/dal/user'
import { NotFoundError, handleApiError } from '@/lib/errors'
import { requireAuthAPI } from '@/lib/session'

type RouteCTX = RouteContext<'/api/users/username/[username]'>

export async function GET(_req: Request, ctx: RouteCTX) {
  try {
    const { user: authenticatedUser } = await requireAuthAPI()
    const { username } = await ctx.params

    const user = await getUserByUsername(username, authenticatedUser.id)
    if (!user) throw new NotFoundError('User not found')

    return Response.json(user)
  } catch (error) {
    return handleApiError(error)
  }
}
