import { api } from '@/lib/ky';
import { QUERY_KEYS } from '@/lib/query-keys';
import { CursorPaginatedPosts, FollowRelationship } from '@/lib/types';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

export function getFeedQuery() {
  return infiniteQueryOptions({
    queryKey: QUERY_KEYS.feed,
    queryFn: ({ pageParam }) =>
      api
        .get('posts/for-you', {
          searchParams: pageParam ? { cursor: pageParam } : undefined,
        })
        .json<CursorPaginatedPosts>(),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    maxPages: 15,
  });
}

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
