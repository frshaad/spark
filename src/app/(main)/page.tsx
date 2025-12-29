import PostEditor from '@/components/posts/editor';
import PostsList from '@/components/posts/posts-list';
import { getPosts } from '@/lib/dal/post';
import { requireUser } from '@/lib/session';

export default async function Home() {
  const { user } = await requireUser();
  const posts = await getPosts();

  return (
    <div className="mx-auto w-full max-w-3xl min-w-0 space-y-5">
      <PostEditor userName={user.name} userImage={user.image || undefined} />
      <PostsList posts={posts} />
    </div>
  );
}
