import type { PostView } from '@/lib/types';

type CommentsProps = {
  post: PostView;
};

export default function Comments({ post }: CommentsProps) {
  return <div>Comments</div>;
}
