'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import FeedSkeleton from '@/components/feed.skeleton'
import InfiniteScrollContainer from '@/components/infinite-scroll-container'
import PostsList from '@/components/posts/posts-list'
import { getFeedQuery } from '@/lib/queries'
import { QUERY_KEYS } from '@/lib/query-keys'

type UserProfileFeedProps = {
  userId: string
}

export default function UserProfileFeed({ userId }: UserProfileFeedProps) {
  const { data, status, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery(
    getFeedQuery(QUERY_KEYS.userPosts(userId), `users/${userId}/posts`),
  )

  if (status === 'pending') {
    return <FeedSkeleton count={5} />
  }

  if (status === 'error') {
    return <div>Error loading posts</div>
  }

  const posts = data.pages.flatMap((page) => page.posts)

  if (status === 'success' && !posts.length && !hasNextPage) {
    return (
      <p className='text-muted-foreground text-center'>The user has not posted anything yet.</p>
    )
  }

  return (
    <InfiniteScrollContainer
      className='space-y-3'
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
    >
      <PostsList posts={posts} />
      {isFetching && <Loader2 className='mx-auto my-3 animate-spin' />}
    </InfiniteScrollContainer>
  )
}
