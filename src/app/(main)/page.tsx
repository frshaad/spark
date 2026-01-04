import DiscoveryPanel from '@/components/discovery-panel';
import ForYouFeed from '@/components/for-you-feed';
import PostEditor from '@/components/posts/editor';
import { requireUser } from '@/lib/session';

export default async function Home() {
  const { user } = await requireUser();

  return (
    <div className="flex w-full gap-6 lg:pr-10 xl:gap-10">
      <main className="no-scrollbar mx-auto w-11/12 max-w-4xl space-y-5 overflow-y-auto p-1 py-4 lg:min-w-sm">
        <PostEditor userName={user.name} userImage={user.image || undefined} />
        <ForYouFeed />
      </main>
      <DiscoveryPanel />
    </div>
  );
}
