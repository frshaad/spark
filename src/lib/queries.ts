import { api } from '@/lib/ky';
import { QUERY_KEYS } from '@/lib/query-keys';
import {
  BookmarkInfo,
  CursorPaginatedComments,
  CursorPaginatedPosts,
  FollowInfo,
  LikeInfo,
} from '@/lib/types';
import {
  QueryKey,
  infiniteQueryOptions,
  queryOptions,
} from '@tanstack/react-query';

export function getFeedQuery(queryKey: QueryKey, apiRoute: string) {
  return infiniteQueryOptions({
    queryKey,
    queryFn: ({ pageParam }) =>
      api
        .get(apiRoute, {
          searchParams: pageParam ? { cursor: pageParam } : undefined,
        })
        .json<CursorPaginatedPosts>(),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    maxPages: 15,
  });
}

export function getCommentsQuery(postId: string) {
  return infiniteQueryOptions({
    queryKey: QUERY_KEYS.comments(postId),
    queryFn: ({ pageParam }) =>
      api
        .get(`posts/${postId}/comment`, {
          searchParams: pageParam ? { cursor: pageParam } : undefined,
        })
        .json<CursorPaginatedComments>(),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (firstPage) => firstPage.previousCursor,
    select: (data) => ({
      pageParams: [...data.pageParams].reverse(),
      pages: [...data.pages].reverse(),
    }),
    maxPages: 10,
  });
}

export const forYouFeedQuery = getFeedQuery(
  QUERY_KEYS.forYouFeed,
  'posts/for-you',
);

export const followingFeedQuery = getFeedQuery(
  QUERY_KEYS.followingFeed,
  'posts/following',
);

export const bookmarksFeedQuery = getFeedQuery(
  QUERY_KEYS.bookmarksFeed,
  'posts/bookmarked',
);

export function getFollowerSummaryQuery(
  targetUserId: string,
  initialData: FollowInfo,
) {
  return queryOptions({
    queryKey: QUERY_KEYS.followerInfo(targetUserId),
    queryFn: () => api.get(`users/${targetUserId}/follow`).json<FollowInfo>(),
    initialData,
  });
}

export function getLikesSummaryQuery(postId: string, initialData: LikeInfo) {
  return queryOptions({
    queryKey: QUERY_KEYS.likeInfo(postId),
    queryFn: () => api.get(`posts/${postId}/likes`).json<LikeInfo>(),
    initialData,
  });
}

export function getBookmarkInfoQuery(
  postId: string,
  initialData: BookmarkInfo,
) {
  return queryOptions({
    queryKey: QUERY_KEYS.bookmarkInfo(postId),
    queryFn: () => api.get(`posts/${postId}/bookmark`).json<BookmarkInfo>(),
    initialData,
  });
}
