'use client';

import { Loader2 } from 'lucide-react';
import PostsList from '@/components/posts/posts-list';
import { getFeedQuery } from '@/lib/queries';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScrollContainer from './infinite-scroll-container';

export default function ForYouFeed() {
  const { data, status, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(getFeedQuery());

  if (status === 'pending') {
    return <div>Loading posts...</div>;
  }

  if (status === 'error') {
    return <div>Error loading posts</div>;
  }

  const posts = data.pages.flatMap((page) => page.posts);

  if (status === 'success' && !posts.length && !hasNextPage) {
    return (
      <p className="text-muted-foreground text-center">
        No one has posted anything yet.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-3"
      onBottomReached={fetchNextPage}
      hasNextPage={hasNextPage}
      isLoading={isFetchingNextPage}
    >
      <PostsList posts={posts} />
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
