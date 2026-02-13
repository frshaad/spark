'use client';

import { Button } from '@/components/ui/button';
import { useFollow } from '@/hooks/use-follow';
import { useFollowerSummary } from '@/hooks/use-follower-summary';
import { FollowRelationship } from '@/lib/types';

type FollowButtonProps = {
  targetUserId: string;
  initialState: FollowRelationship;
};

export default function FollowButton({
  targetUserId,
  initialState,
}: FollowButtonProps) {
  const { data } = useFollowerSummary(targetUserId, initialState);
  const { isFollowing } = data;

  const { mutate } = useFollow();

  return (
    <Button
      variant={isFollowing ? 'secondary' : 'default'}
      onClick={() => mutate({ targetUserId, isFollowing })}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
}
