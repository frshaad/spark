import { NextRequest } from 'next/server';
import { getForYouFeedPosts } from '@/lib/dal/post';
import { handleApiError } from '@/lib/errors';
import {
  buildCursorPaginatedPosts,
  getCursorPaginationParams,
} from '@/lib/server-api';
import { requireAuthAPI } from '@/lib/session';

export async function GET(req: NextRequest) {
  try {
    const { user } = await requireAuthAPI();
    const { cursor, pageSize } = getCursorPaginationParams(req);

    const posts = await getForYouFeedPosts({
      cursor,
      pageSize,
      authenticatedUserId: user.id,
    });

    return Response.json(buildCursorPaginatedPosts(posts, pageSize));
  } catch (error) {
    return handleApiError(error);
  }
}
