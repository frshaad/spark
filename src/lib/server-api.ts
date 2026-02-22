import { NextRequest } from 'next/server';
import {
  CommentRecord,
  CursorPaginatedComments,
  CursorPaginatedPosts,
  PostRecord,
  isOnboardedComment,
  isOnboardedPost,
} from '@/lib/types';

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

export function buildCursorPaginatedComments(
  comments: CommentRecord[],
  pageSize: number,
): CursorPaginatedComments {
  // Filter out posts from users without username
  const validComments = comments.filter(isOnboardedComment);

  const hasNextPage = validComments.length > pageSize;
  const previousCursor = hasNextPage ? validComments[0].id : null;

  return {
    comments:
      validComments.length > pageSize ? validComments.slice(1) : validComments,
    previousCursor,
  };
}

export function getCursorPaginationParams(
  req: NextRequest,
  pageSize: number = 5,
) {
  const cursor = req.nextUrl.searchParams.get('cursor') || undefined;

  return { cursor, pageSize };
}
