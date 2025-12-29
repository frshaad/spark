import { Suspense } from 'react';
import PostEditor from '@/components/posts/editor';
import PostsList from '@/components/posts/posts-list';
import { getPosts } from '@/lib/dal/post';
import { requireUser } from '@/lib/session';

export default async function Home() {
  const { user } = await requireUser();
  const postsPromise = getPosts();

  return (
    <div className="w-full max-w-3xl min-w-0 space-y-5">
      <PostEditor userName={user.name} userImage={user.image || undefined} />
      <Suspense fallback={<div>Loading...</div>}>
        <PostsList promise={postsPromise} />
      </Suspense>
    </div>
  );
}
