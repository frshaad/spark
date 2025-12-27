import PostEditor from '@/components/posts/editor';
import { requireUser } from '@/lib/session';

export default async function Home() {
  const { user } = await requireUser();

  return (
    <div className="w-full max-w-3xl min-w-0 space-y-5">
      <PostEditor userName={user.name} userImage={user.image || undefined} />
    </div>
  );
}
