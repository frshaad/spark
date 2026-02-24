import { NextRequest } from 'next/server';
import { getUserPosts } from '@/lib/dal/post';
import { handleApiError } from '@/lib/errors';
import {
  buildCursorPaginatedByKey,
  getCursorPaginationParams,
} from '@/lib/server-api';
import { requireAuthAPI } from '@/lib/session';
import { isOnboardedPost } from '@/lib/types';

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

    return Response.json(
      buildCursorPaginatedByKey({
        key: 'posts',
        items: posts,
        pageSize,
        filter: isOnboardedPost,
      }),
    );
  } catch (error) {
    return handleApiError(error);
  }
}
