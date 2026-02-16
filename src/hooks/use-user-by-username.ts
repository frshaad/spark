import { NotFoundError } from '@/lib/errors';
import { api } from '@/lib/ky';
import { QUERY_KEYS } from '@/lib/query-keys';
import { UserRecord } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export function UseGetUserByUsername(username: string) {
  return useQuery({
    queryKey: QUERY_KEYS.user(username),
    queryFn: () => api.get(`users/username/${username}`).json<UserRecord>(),
    retry(failureCount, error) {
      if (error instanceof NotFoundError) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: 120_000,
  });
}
