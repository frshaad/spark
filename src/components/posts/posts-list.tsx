import { PostData } from '@/lib/types';
import Post from './post';

export default function PostsList({
  posts,
}: {
  posts: PostData[];
  className?: string;
}) {
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}
