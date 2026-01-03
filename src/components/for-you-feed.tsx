'use client';

import PostsList from '@/components/posts/posts-list';
import { getFeedQuery } from '@/lib/queries';
import { useQuery } from '@tanstack/react-query';

export default function ForYouFeed() {
  const { data: posts, status } = useQuery(getFeedQuery());

  if (status === 'pending') {
    return <div>Loading posts...</div>;
  }

  if (status === 'error') {
    return <div>Error loading posts</div>;
  }

  return <PostsList posts={posts} />;
}
