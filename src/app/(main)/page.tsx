import DiscoveryPanel from '@/components/discovery-panel';
import Feeds from '@/components/feeds';
import PostEditor from '@/components/posts/editor';
import { requireAuth } from '@/lib/session';

export default async function Home() {
  const { user } = await requireAuth();

  return (
    <div className="flex w-full gap-6 lg:pr-10 xl:gap-10">
      <main className="no-scrollbar mx-auto w-11/12 max-w-4xl space-y-5 overflow-y-auto p-1 py-4 lg:min-w-sm">
        <PostEditor
          user={{
            name: user.name,
            image: user.image ?? null,
          }}
        />
        <Feeds />
      </main>
      <DiscoveryPanel />
    </div>
  );
}
