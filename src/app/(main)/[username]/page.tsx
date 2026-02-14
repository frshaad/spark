import { Metadata } from 'next';
import ProfileHeader from '@/components/profile/profile-header';
import UserProfileFeed from '@/components/profile/user-feed';
import { Separator } from '@/components/ui/separator';
import { getUser } from '@/lib/dal/user';
import { requireOnboardedUser } from '@/lib/session';

export default async function UserProfile({
  params,
}: PageProps<'/[username]'>) {
  const { user: authenticatedUser } = await requireOnboardedUser();
  const { username } = await params;

  const user = await getUser(username, authenticatedUser.id);

  return (
    <>
      <ProfileHeader user={user} authenticatedUserId={authenticatedUser.id} />
      <Separator />
      <UserProfileFeed userId={user.id} />
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<'/[username]'>): Promise<Metadata> {
  const { user: authenticatedUser } = await requireOnboardedUser();
  const { username } = await params;

  const user = await getUser(username, authenticatedUser.id);

  return {
    title: `${user.displayUsername ?? user.name} (@${user.username})`,
  };
}
