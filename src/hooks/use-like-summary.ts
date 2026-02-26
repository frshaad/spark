import { useQuery } from '@tanstack/react-query'
import type { LikeInfo } from '@/lib/types'
import { getLikesSummaryQuery } from '@/lib/queries'

export function useLikesSummary(postId: string, initialState: LikeInfo) {
  return useQuery(getLikesSummaryQuery(postId, initialState))
}
