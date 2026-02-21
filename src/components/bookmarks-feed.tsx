'use client';

import { Loader2 } from 'lucide-react';
import FeedSkeleton from '@/components/feed.skeleton';
import InfiniteScrollContainer from '@/components/infinite-scroll-container';
import PostsList from '@/components/posts/posts-list';
import { bookmarksFeedQuery } from '@/lib/queries';
import { useInfiniteQuery } from '@tanstack/react-query';

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
    return (
      <p className="text-muted-foreground text-center">
        You don't have any bookmarks yet.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-3"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
    >
      <PostsList posts={posts} />
      {isFetching && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
