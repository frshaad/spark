import { NextRequest } from 'next/server';
import {
  CommentRecord,
  CursorPaginatedComments,
  CursorPaginatedPosts,
  PostRecord,
  isOnboardedPost,
} from '@/lib/types';

export function buildCursorPaginatedPosts(
  posts: PostRecord[],
  pageSize: number,
): CursorPaginatedPosts {
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
  const hasNextPage = comments.length > pageSize;

  const paginatedComments = hasNextPage
    ? comments.slice(0, pageSize)
    : comments;

  const nextCursor = hasNextPage
    ? paginatedComments[paginatedComments.length - 1].id
    : null;

  return {
    comments: paginatedComments,
    nextCursor,
  };
}

export function getCursorPaginationParams(
  req: NextRequest,
  pageSize: number = 5,
) {
  const cursor = req.nextUrl.searchParams.get('cursor') || undefined;

  return { cursor, pageSize };
}
