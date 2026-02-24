'use client';

import Link from 'next/link';
import FollowButton from '@/components/follow-button';
import Linkify from '@/components/linkify';
import FollowStats from '@/components/profile/follow-stats';
import { Card, CardAction, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import UserAvatar from '@/components/user-avatar';
import { authClient } from '@/lib/auth-client';
import { FollowInfo, UserRecord } from '@/lib/types';

interface UserTooltipProps extends React.PropsWithChildren {
  user: UserRecord;
}

export default function UserTooltip({ user, children }: UserTooltipProps) {
  const { data } = authClient.useSession();
  const authenticatedUserId = data?.user.id;

  const followState: FollowInfo = {
    isFollowing: Boolean(
      user.followers.some(({ followerId }) => followerId === authenticatedUserId),
    ),
    followersCount: user._count.followers,
    followingCount: user._count.following,
  };

  return (
    <Tooltip>
      <TooltipTrigger className='flex space-x-2'>{children}</TooltipTrigger>

      <TooltipContent className='bg-card rounded-xl p-0'>
        <Card>
          <CardHeader>
            <Link href={`/${user.username}`}>
              <UserAvatar user={{ name: user.name, image: user.image }} className='size-16' />
            </Link>
            {authenticatedUserId !== user.id && (
              <CardAction>
                <FollowButton initialState={followState} targetUserId={user.id} />
              </CardAction>
            )}
          </CardHeader>

          <CardContent className='space-y-2'>
            <div>
              <Link href={`/${user.username}`}>
                <div className='text-lg font-semibold hover:underline'>{user.name}</div>
                <div className='text-muted-foreground'>@{user.username}</div>
              </Link>
            </div>
            {user.bio && (
              <Linkify>
                <div className='line-clamp-4 whitespace-pre-line'>{user.bio}</div>
              </Linkify>
            )}
          </CardContent>

          <CardFooter className='space-x-5'>
            <FollowStats targetUserId={user.id} initialState={followState} />
          </CardFooter>
        </Card>
      </TooltipContent>
    </Tooltip>
  );
}
