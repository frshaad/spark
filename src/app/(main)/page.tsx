import DiscoveryPanel from '@/components/discovery-panel';
import PostEditor from '@/components/posts/editor';
import PostsList from '@/components/posts/posts-list';
import { getPosts } from '@/lib/dal/post';
import { requireUser } from '@/lib/session';

export default async function Home() {
  const { user } = await requireUser();
  const posts = await getPosts();

  return (
    <div className="flex gap-10 xl:gap-20">
      <main className="mx-auto w-11/12 max-w-4xl space-y-5 lg:min-w-2xl">
        <PostEditor userName={user.name} userImage={user.image || undefined} />
        <PostsList posts={posts} />
      </main>
      <DiscoveryPanel />
    </div>
  );
}
