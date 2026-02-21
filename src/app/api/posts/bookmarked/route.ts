import { NextRequest } from 'next/server';
import { getBookmarkedPosts } from '@/lib/dal/bookmark';
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

    const bookmarks = await getBookmarkedPosts({
      cursor,
      pageSize,
      authenticatedUserId: user.id,
    });

    return Response.json(
      buildCursorPaginatedPosts(
        bookmarks.map((b) => b.post),
        pageSize,
      ),
    );
  } catch (error) {
    return handleApiError(error);
  }
}
