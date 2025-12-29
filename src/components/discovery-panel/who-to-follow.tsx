import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from '@/components/ui/item';
import UserAvatar from '@/components/user-avatar';
import { usersToFollow } from '@/lib/dal/user';
import { requireUser } from '@/lib/session';

export default async function WhoToFollow() {
  const { user } = await requireUser();
  const suggestedUsers = await usersToFollow(user.id);

  return (
    <Card className="gap-1">
      <CardHeader>
        <CardTitle className="text-lg">Who to follow</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {suggestedUsers.map((user) => (
          <Item key={user.id}>
            <ItemContent>
              <ItemTitle>
                <UserAvatar name={user.displayUsername} image={user.image} />
                <div>
                  <p className="text-sm font-semibold hover:underline">
                    {user.displayUsername}
                  </p>
                  <p className="text-muted-foreground text-sm hover:underline">
                    @{user.username}
                  </p>
                </div>
              </ItemTitle>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm">
                Follow
              </Button>
            </ItemActions>
          </Item>
        ))}
      </CardContent>
    </Card>
  );
}
