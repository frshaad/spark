import DiscoveryPanel from '@/components/discovery-panel';
import ForYouFeed from '@/components/for-you-feed';
import PostEditor from '@/components/posts/editor';
import { requireUser } from '@/lib/session';

export default async function Home() {
  const { user } = await requireUser();

  return (
    <div className="flex gap-10 xl:gap-20">
      <main className="mx-auto w-11/12 max-w-4xl space-y-5 lg:min-w-2xl">
        <PostEditor userName={user.name} userImage={user.image || undefined} />
        <ForYouFeed />
      </main>
      <DiscoveryPanel />
    </div>
  );
}
