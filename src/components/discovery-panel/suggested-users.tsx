import { Route } from 'next';
import Link from 'next/link';
import FollowButton from '@/components/follow-button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from '@/components/ui/item';
import UserAvatar from '@/components/user-avatar';
import UserTooltip from '@/components/user-tooltip';
import { getUsersToFollow } from '@/lib/dal/user';
import { requireAuth } from '@/lib/session';

export default async function SuggestedUsersList() {
  const { user: authenticatedUser } = await requireAuth();
  const suggestedUsers = await getUsersToFollow(authenticatedUser.id);

  return (
    <>
      {suggestedUsers.map((user) => (
        <Item key={user.id}>
          <ItemContent>
            <UserTooltip user={user}>
              <Link href={`/${user.username}` as Route}>
                <ItemTitle>
                  <UserAvatar
                    user={{
                      image: user.image,
                      name: user.name,
                    }}
                  />
                  <div>
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-muted-foreground text-left text-xs">
                      @{user.username}
                    </p>
                  </div>
                </ItemTitle>
              </Link>
            </UserTooltip>
          </ItemContent>
          <ItemActions>
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
          </ItemActions>
        </Item>
      ))}
    </>
  );
}
