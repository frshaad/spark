import { useQuery } from '@tanstack/react-query';
import { getLikesSummaryQuery } from '@/lib/queries';
import { LikeInfo } from '@/lib/types';

export function useLikesSummary(postId: string, initialState: LikeInfo) {
  return useQuery(getLikesSummaryQuery(postId, initialState));
}
