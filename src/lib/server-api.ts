import { NextRequest } from 'next/server';
import { CursorPaginatedPosts, PostRecord, isOnboardedPost } from '@/lib/types';

export function buildCursorPaginatedPosts(
  posts: PostRecord[],
  pageSize: number,
): CursorPaginatedPosts {
  // Filter out posts from users without username
  const validPosts = posts.filter(isOnboardedPost);

  const hasNextPage = validPosts.length > pageSize;
  const nextCursor = hasNextPage ? validPosts[pageSize].id : null;

  return {
    posts: validPosts.slice(0, pageSize),
    nextCursor,
  };
}

export function getCursorPaginationParams(req: NextRequest) {
  const cursor = req.nextUrl.searchParams.get('cursor') || undefined;
  const pageSize = 10;

  return { cursor, pageSize };
}
