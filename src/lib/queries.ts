import { api } from '@/lib/ky';
import { QUERY_KEYS } from '@/lib/query-keys';
import { CursorPaginatedPosts, FollowRelationship } from '@/lib/types';
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

export function getFollowerSummaryQuery(
  targetUserId: string,
  initialData: FollowRelationship,
) {
  return queryOptions({
    queryKey: QUERY_KEYS.followerInfo(targetUserId),
    queryFn: () =>
      api.get(`users/${targetUserId}/follow`).json<FollowRelationship>(),
    initialData,
    staleTime: Infinity, // 60_000
  });
}
