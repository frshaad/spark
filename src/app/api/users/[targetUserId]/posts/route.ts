import { NextRequest } from 'next/server';
import { getUserPosts } from '@/lib/dal/post';
import { handleApiError } from '@/lib/errors';
import {
  buildCursorPaginatedPosts,
  getCursorPaginationParams,
} from '@/lib/server-api';
import { requireAuthAPI } from '@/lib/session';

type RouteCTX = RouteContext<'/api/users/[targetUserId]/posts'>;

export async function GET(req: NextRequest, ctx: RouteCTX) {
  try {
    await requireAuthAPI();
    const { targetUserId } = await ctx.params;

    const { cursor, pageSize } = getCursorPaginationParams(req);

    const posts = await getUserPosts({
      cursor,
      pageSize,
      userId: targetUserId,
    });

    return Response.json(buildCursorPaginatedPosts(posts, pageSize));
  } catch (error) {
    return handleApiError(error);
  }
}
