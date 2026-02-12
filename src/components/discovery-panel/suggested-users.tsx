import { Route } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from '@/components/ui/item';
import UserAvatar from '@/components/user-avatar';
import { usersToFollow } from '@/lib/dal/user';
import { requireOnboardedUser } from '@/lib/session';
import FollowButton from '../follow-button';

export default async function SuggestedUsersList() {
  const { user } = await requireOnboardedUser();
  const suggestedUsers = await usersToFollow(user.id);

  return (
    <>
      {suggestedUsers.map((user) => (
        <Item key={user.id}>
          <ItemContent>
            <Link href={`/${user.username}` as Route}>
              <ItemTitle>
                <UserAvatar
                  user={{
                    image: user.image,
                    name: user.displayUsername ?? user.name,
                  }}
                />
                <div>
                  <p className="text-sm font-semibold">
                    {user.displayUsername}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    @{user.username}
                  </p>
                </div>
              </ItemTitle>
            </Link>
          </ItemContent>
          <ItemActions>
            <FollowButton
              targetUserId={user.id}
              initialState={{
                totalFollowers: 0,
                isFollowedByViewer: false,
              }}
            />
          </ItemActions>
        </Item>
      ))}
    </>
  );
}
