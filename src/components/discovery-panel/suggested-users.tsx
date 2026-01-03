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
import { requireUser } from '@/lib/session';

export default async function SuggestedUsersList() {
  const { user } = await requireUser();
  const suggestedUsers = await usersToFollow(user.id);

  return (
    <>
      {suggestedUsers.map((user) => (
        <Item key={user.id}>
          <ItemContent>
            <Link href={`/${user.username}` as Route}>
              <ItemTitle>
                <UserAvatar name={user.displayUsername} image={user.image} />
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
            <Button variant="outline" size="sm">
              Follow
            </Button>
          </ItemActions>
        </Item>
      ))}
    </>
  );
}
