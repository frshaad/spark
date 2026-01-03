import kyInstance from '@/lib/ky';
import { queryKeys } from '@/lib/query-keys';
import { PostData } from '@/lib/types';
import { queryOptions } from '@tanstack/react-query';

export function getFeedQuery() {
  return queryOptions({
    queryKey: queryKeys.feed,
    queryFn: () => kyInstance.get('posts/for-you').json<PostData[]>(),
  });
}
