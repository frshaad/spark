import { getFollowerSummaryQuery } from '@/lib/queries';
import { FollowInfo } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

/**
 * Fetches and subscribes to a user's follower summary.
 *
 * This hook returns React Query state for follower-related metadata
 * (e.g. follower count, following count, relationship flags).
 * It uses `initialState` as placeholder/initial data to avoid UI flicker
 * and enable instant rendering.
 *
 * @param targetUserId - The ID of the user whose follow information should be retrieved.
 * @param initialState - Initial/placeholder follow state used before the query resolves.
 *
 * @returns React Query result containing:
 * - `data` → FollowInfo
 * - `isLoading`
 * - `isError`
 * - `refetch`
 *
 * @example
 * const { data, isLoading } = useFollowerSummary(user.id, {
 *   followersCount: 0,
 *   followingCount: 0,
 *   isFollowing: false,
 * });
 */
export function useFollowerSummary(
  targetUserId: string,
  initialState: FollowInfo,
) {
  return useQuery(getFollowerSummaryQuery(targetUserId, initialState));
}
