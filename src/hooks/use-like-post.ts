import { QueryKey, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/lib/ky';
import { QUERY_KEYS } from '@/lib/query-keys';
import { LikeInfo } from '@/lib/types';

type LikeVariables = {
  postId: string;
  isLiked: boolean;
};

export function useLikePost() {
  return useMutation({
    mutationFn: ({ postId, isLiked }: LikeVariables) =>
      isLiked ? api.delete(`posts/${postId}/likes`) : api.post(`posts/${postId}/likes`),

    async onMutate({ postId }, ctx) {
      const queryKey: QueryKey = QUERY_KEYS.likeInfo(postId);

      await ctx.client.cancelQueries({ queryKey });

      const previousData = ctx.client.getQueryData<LikeInfo>(queryKey);

      ctx.client.setQueryData<LikeInfo>(queryKey, () => ({
        isLiked: !previousData?.isLiked,
        likesCount: (previousData?.likesCount || 0) + (previousData?.isLiked ? -1 : 1),
      }));

      return previousData;
    },

    onError(error, { postId }, previousData, ctx) {
      const queryKey: QueryKey = QUERY_KEYS.likeInfo(postId);
      ctx.client.setQueryData<LikeInfo>(queryKey, previousData);
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    },

    async onSettled(_d, _e, { postId }, _o, ctx) {
      const queryKey: QueryKey = QUERY_KEYS.likeInfo(postId);
      await ctx.client.invalidateQueries({ queryKey });
    },
  });
}
