import { api } from '@/lib/ky';
import { useMutation } from '@tanstack/react-query';

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
  });
}
