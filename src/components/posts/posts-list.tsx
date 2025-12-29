import { PostData } from '@/lib/dal/post';
import Post from './post';

export default async function PostsList({
  promise,
}: {
  promise: Promise<PostData[]>;
}) {
  const posts = await promise;

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
