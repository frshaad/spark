import { Loader2 } from 'lucide-react';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Comments from '@/components/comments';
import CommentInput from '@/components/comments/comment-input';
import Post from '@/components/posts/post';
import UserInfoCard from '@/components/user-info-card';
import { getPostOrThrow } from '@/lib/dal/post';
import { requireAuth } from '@/lib/session';

type PostPageProps = PageProps<'/[username]/[postId]'>;

export default async function PostPage({ params }: PostPageProps) {
  const { postId } = await params;
  const { user: authenticatedUser } = await requireAuth();

  const post = await getPostOrThrow(postId, authenticatedUser.id);

  return (
    <div className='flex w-full gap-6 lg:pr-10 xl:gap-10'>
      <main className='no-scrollbar mx-auto w-11/12 max-w-4xl space-y-5 overflow-y-auto p-1 py-4 lg:min-w-sm'>
        <Post post={post} />
        <CommentInput post={post} />
        <Comments post={post} />
      </main>
      <aside className='min-w-64 space-y-5 pt-4 max-xl:hidden xl:min-w-72'>
        <Suspense fallback={<Loader2 className='mx-auto animate-spin' />}>
          <UserInfoCard user={post.author} />
        </Suspense>
      </aside>
    </div>
  );
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { postId } = await params;
  const { user: authenticatedUser } = await requireAuth();

  const post = await getPostOrThrow(postId, authenticatedUser.id);

  return {
    title: `${post.author.name}: ${post.content.slice(0, 50)}...`,
  };
}
