'use client';

import { Button } from '@/components/ui/button';
import { useFollow } from '@/hooks/use-follow';
import { useFollowerSummary } from '@/hooks/use-follower-summary';
import { UserFollowersSummary } from '@/lib/types';

type FollowButtonProps = {
  targetUserId: string;
  initialState: UserFollowersSummary;
};

export default function FollowButton({
  targetUserId,
  initialState,
}: FollowButtonProps) {
  const { data } = useFollowerSummary(targetUserId, initialState);
  const isAlreadyFollowing = data.isFollowedByViewer;

  const { mutate } = useFollow();

  return (
    <Button
      variant={isAlreadyFollowing ? 'secondary' : 'default'}
      onClick={() => mutate({ targetUserId, isAlreadyFollowing })}
    >
      {isAlreadyFollowing ? 'Following' : 'Follow'}
    </Button>
  );
}
