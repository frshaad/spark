import { NextRequest } from 'next/server';
import { getFollowingFeedPosts } from '@/lib/dal/post';
import { handleApiError } from '@/lib/errors';
import {
  buildCursorPaginatedPosts,
  getCursorPaginationParams,
} from '@/lib/server-api';
import { requireOnboardedUserApi } from '@/lib/session';

export async function GET(req: NextRequest) {
  try {
    const { user } = await requireOnboardedUserApi();
    const { cursor, pageSize } = getCursorPaginationParams(req);

    const posts = await getFollowingFeedPosts({
      authenticatedUserId: user.id,
      cursor,
      pageSize,
    });

    return Response.json(buildCursorPaginatedPosts(posts, pageSize));
  } catch (error) {
    return handleApiError(error);
  }
}
