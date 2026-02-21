import { getLikesSummaryQuery } from '@/lib/queries';
import { LikeInfo } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export function useLikesSummary(postId: string, initialState: LikeInfo) {
  return useQuery(getLikesSummaryQuery(postId, initialState));
}
