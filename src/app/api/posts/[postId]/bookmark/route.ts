import { bookmarkPost, deleteBookmark, getBookmarkInfo } from '@/lib/dal/bookmark'
import { handleApiError } from '@/lib/errors'
import { requireAuthAPI } from '@/lib/session'
import { BookmarkInfo } from '@/lib/types'

type RouteCtx = RouteContext<'/api/posts/[postId]/bookmark'>

export async function GET(_req: Request, ctx: RouteCtx) {
  try {
    const { postId } = await ctx.params
    const { user: authenticatedUser } = await requireAuthAPI()

    const bookmark = await getBookmarkInfo(postId, authenticatedUser.id)

    const bookmarkInfo: BookmarkInfo = {
      isBookmarked: !!bookmark,
    }

    return Response.json(bookmarkInfo)
  } catch (error) {
    handleApiError(error)
  }
}

export async function POST(_req: Request, ctx: RouteCtx) {
  try {
    const { postId } = await ctx.params
    const { user: authenticatedUser } = await requireAuthAPI()

    await bookmarkPost(postId, authenticatedUser.id)

    return new Response()
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(_req: Request, ctx: RouteCtx) {
  try {
    const { postId } = await ctx.params
    const { user: authenticatedUser } = await requireAuthAPI()

    await deleteBookmark(postId, authenticatedUser.id)

    return new Response()
  } catch (error) {
    return handleApiError(error)
  }
}
