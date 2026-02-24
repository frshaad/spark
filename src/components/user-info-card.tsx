import Link from 'next/link';
import type { UserRecord } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { requireAuth } from '@/lib/session';
import FollowButton from './follow-button';
import Linkify from './linkify';
import UserAvatar from './user-avatar';
import UserTooltip from './user-tooltip';

type UserInfoCardProps = {
  user: UserRecord;
};

export default async function UserInfoCard({ user }: UserInfoCardProps) {
  const { user: authenticatedUser } = await requireAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>About the author</CardTitle>
      </CardHeader>
      <CardContent className='space-y-5'>
        <UserTooltip user={user}>
          <Link href={`/${user.username}`} className='flex items-center gap-3'>
            <UserAvatar user={{ name: user.name, image: user.image }} className='size-16' />
            <div>
              <p className='line-clamp-1 text-lg font-semibold break-all hover:underline'>
                {user.name}
              </p>
              <p className='text-muted-foreground line-clamp-1 text-base break-all hover:underline'>
                @{user.username}
              </p>
            </div>
          </Link>
        </UserTooltip>

        <Linkify>
          <p className='text-muted-foreground line-clamp-6 wrap-break-word whitespace-pre-line'>
            {user.bio}
          </p>
        </Linkify>

        {user.id !== authenticatedUser.id && (
          <FollowButton
            targetUserId={user.id}
            initialState={{
              followersCount: user._count.followers,
              followingCount: user._count.following,
              isFollowing: user.followers.some(
                ({ followerId }) => followerId === authenticatedUser.id,
              ),
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
