import { Metadata } from 'next';
import DiscoveryPanel from '@/components/discovery-panel';
import ProfileHeader from '@/components/profile/profile-header';
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
    <div className="flex w-full gap-6 lg:pr-10 xl:gap-10">
      <main className="no-scrollbar mx-auto w-11/12 max-w-4xl space-y-5 overflow-y-auto p-1 py-4 lg:min-w-sm">
        <ProfileHeader user={user} authenticatedUserId={authenticatedUser.id} />
        <Separator />
      </main>
      <DiscoveryPanel />
    </div>
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
