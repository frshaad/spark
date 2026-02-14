import { toast } from 'sonner';
import { api } from '@/lib/ky';
import { QUERY_KEYS } from '@/lib/query-keys';
import { FollowInfo } from '@/lib/types';
import { QueryKey, useMutation } from '@tanstack/react-query';

type FollowVariables = {
  targetUserId: string;
  isFollowing: boolean;
};

export function useFollow() {
  return useMutation({
    mutationFn: ({ isFollowing, targetUserId }: FollowVariables) =>
      isFollowing
        ? api.delete(`users/${targetUserId}/follow`)
        : api.post(`users/${targetUserId}/follow`),

    async onMutate({ targetUserId }, ctx) {
      const queryKey: QueryKey = QUERY_KEYS.followerInfo(targetUserId);

      await ctx.client.cancelQueries({ queryKey });

      const previousData = ctx.client.getQueryData<FollowInfo>(queryKey);

      ctx.client.setQueryData<FollowInfo>(queryKey, () => ({
        followersCount:
          (previousData?.followersCount || 0) +
          (previousData?.isFollowing ? -1 : 1),
        followingCount: previousData?.followingCount || 0,
        isFollowing: !previousData?.isFollowing,
      }));

      return previousData;
    },

    onError(error, { targetUserId }, previousData, ctx) {
      const queryKey: QueryKey = QUERY_KEYS.followerInfo(targetUserId);
      ctx.client.setQueryData<FollowInfo>(queryKey, previousData);
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    },

    async onSettled(_d, _e, { targetUserId }, _o, ctx) {
      const queryKey: QueryKey = QUERY_KEYS.followerInfo(targetUserId);
      await ctx.client.invalidateQueries({ queryKey });
    },
  });
}
