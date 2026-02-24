'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { BookmarkCheck, Loader2 } from 'lucide-react';
import FeedSkeleton from '@/components/feed.skeleton';
import InfiniteScrollContainer from '@/components/infinite-scroll-container';
import PostsList from '@/components/posts/posts-list';
import { bookmarksFeedQuery } from '@/lib/queries';

export default function BookmarksFeed() {
  const { data, status, hasNextPage, isFetching, fetchNextPage } =
    useInfiniteQuery(bookmarksFeedQuery);

  if (status === 'pending') {
    return <FeedSkeleton count={5} />;
  }

  if (status === 'error') {
    return <div>Error loading bookmarks</div>;
  }

  const posts = data.pages.flatMap((page) => page.posts);

  if (status === 'success' && !posts.length && !hasNextPage) {
    return <p className='text-muted-foreground text-center'>You don't have any bookmarks yet.</p>;
  }

  return (
    <>
      <h1 className='mb-8 flex items-center gap-4 text-2xl font-bold'>
        <BookmarkCheck className='relative top-px' />
        Bookmarks
      </h1>
      <InfiniteScrollContainer
        className='space-y-3'
        onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
      >
        <PostsList posts={posts} />
        {isFetching && <Loader2 className='mx-auto my-3 animate-spin' />}
      </InfiniteScrollContainer>
    </>
  );
}
