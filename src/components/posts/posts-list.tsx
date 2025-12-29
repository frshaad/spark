import { PostData } from '@/lib/types';
import Post from './post';

export default function PostsList({ posts }: { posts: PostData[] }) {
  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
