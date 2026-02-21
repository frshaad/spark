import { api } from '@/lib/ky';
import { QUERY_KEYS } from '@/lib/query-keys';
import {
  BookmarkInfo,
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
    staleTime: 60_000,
  });
}

export function getLikesSummaryQuery(postId: string, initialData: LikeInfo) {
  return queryOptions({
    queryKey: QUERY_KEYS.likeInfo(postId),
    queryFn: () => api.get(`posts/${postId}/likes`).json<LikeInfo>(),
    initialData,
    staleTime: 30_000,
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
    staleTime: 120_000,
  });
}
