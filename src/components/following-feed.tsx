'use client';

import { Loader2 } from 'lucide-react';
import PostsList from '@/components/posts/posts-list';
import { followingFeedQuery } from '@/lib/queries';
import { useInfiniteQuery } from '@tanstack/react-query';
import FeedSkeleton from './feed.skeleton';
import InfiniteScrollContainer from './infinite-scroll-container';

export default function FollowingFeed() {
  const { data, status, hasNextPage, isFetching, fetchNextPage } =
    useInfiniteQuery(followingFeedQuery);

  if (status === 'pending') {
    return <FeedSkeleton count={5} />;
  }

  if (status === 'error') {
    return <div>Error loading posts</div>;
  }

  const posts = data.pages.flatMap((page) => page.posts);

  if (status === 'success' && !posts.length && !hasNextPage) {
    return (
      <p className="text-muted-foreground text-center">
        No posts found. Start following people to see their posts.
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
