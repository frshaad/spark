import { api } from '@/lib/ky';
import { queryKeys } from '@/lib/query-keys';
import { PostsPage } from '@/lib/types';
import { infiniteQueryOptions } from '@tanstack/react-query';

export function getFeedQuery() {
  return infiniteQueryOptions({
    queryKey: queryKeys.feed,
    queryFn: ({ pageParam }) =>
      api
        .get('posts/for-you', {
          searchParams: pageParam ? { cursor: pageParam } : undefined,
        })
        .json<PostsPage>(),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
