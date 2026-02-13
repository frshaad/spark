import { getFollowerSummaryQuery } from '@/lib/queries';
import { FollowRelationship } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export function useFollowerSummary(
  targetUserId: string,
  initialState: FollowRelationship,
) {
  return useQuery(getFollowerSummaryQuery(targetUserId, initialState));
}
