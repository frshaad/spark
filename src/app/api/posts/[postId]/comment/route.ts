import type { NextRequest } from 'next/server'
import { getPaginatedComments } from '@/lib/dal/comment'
import { handleApiError } from '@/lib/errors'
import { buildCursorPaginatedComments, getCursorPaginationParams } from '@/lib/server-api'
import { requireAuthAPI } from '@/lib/session'

type RouteCtx = RouteContext<'/api/posts/[postId]/comment'>

export async function GET(req: NextRequest, ctx: RouteCtx) {
  try {
    const { postId } = await ctx.params
    const { user: authenticatedUser } = await requireAuthAPI()

    const { cursor, pageSize } = getCursorPaginationParams(req, 5)

    const comments = await getPaginatedComments({
      cursor,
      pageSize,
      authenticatedUserId: authenticatedUser.id,
      postId,
    })

    return Response.json(buildCursorPaginatedComments(comments, pageSize))
  } catch (error) {
    handleApiError(error)
  }
}
