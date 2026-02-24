import { NextRequest } from 'next/server';
import { getBookmarkedPosts } from '@/lib/dal/bookmark';
import { handleApiError } from '@/lib/errors';
import {
  buildCursorPaginatedByKey,
  getCursorPaginationParams,
} from '@/lib/server-api';
import { requireAuthAPI } from '@/lib/session';
import { isOnboardedPost } from '@/lib/types';

export async function GET(req: NextRequest) {
  try {
    const { user } = await requireAuthAPI();
    const { cursor, pageSize } = getCursorPaginationParams(req);

    const bookmarks = await getBookmarkedPosts({
      cursor,
      pageSize,
      authenticatedUserId: user.id,
    });

    return Response.json(
      buildCursorPaginatedByKey({
        key: 'posts',
        items: bookmarks.map((b) => b.post),
        pageSize,
        filter: isOnboardedPost,
      }),
    );
  } catch (error) {
    return handleApiError(error);
  }
}
