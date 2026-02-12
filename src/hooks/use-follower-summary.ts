import { getFollowerSummaryQuery } from '@/lib/queries';
import { UserFollowersSummary } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export function useFollowerSummary(
  targetUserId: string,
  initialState: UserFollowersSummary,
) {
  return useQuery(getFollowerSummaryQuery(targetUserId, initialState));
}
