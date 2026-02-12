import { api } from '@/lib/ky';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type FollowVariables = {
  targetUserId: string;
  isAlreadyFollowing: boolean;
};

export function useFollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ isAlreadyFollowing, targetUserId }: FollowVariables) =>
      isAlreadyFollowing
        ? api.delete(`users/${targetUserId}/follow`)
        : api.post(`users/${targetUserId}/follow`),
  });
}
