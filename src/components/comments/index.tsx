'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import type { PostView } from '@/lib/types';
import InfiniteScrollContainer from '@/components/infinite-scroll-container';
import { getCommentsQuery } from '@/lib/queries';
import Comment from './comment';
import CommentSkeleton from './comment.skeleton';

type CommentsProps = {
  post: PostView;
};

export default function Comments({ post }: CommentsProps) {
  const { data, status, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery(
    getCommentsQuery(post.id),
  );

  if (status === 'pending') {
    return (
      <div className='space-y-3'>
        {Array.from({ length: 2 }).map((_, i) => (
          <CommentSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return <div>An error occurred while loading comments.</div>;
  }

  const comments = data.pages.flatMap((page) => page.comments);

  if (status === 'success' && !comments.length && !hasNextPage) {
    return <p className='text-muted-foreground text-center'>No one has commented yet.</p>;
  }

  return (
    <InfiniteScrollContainer
      className='space-y-3'
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
    >
      <div className='flex flex-col gap-2'>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
      {isFetching && <Loader2 className='mx-auto my-3 animate-spin' />}
    </InfiniteScrollContainer>
  );
}
