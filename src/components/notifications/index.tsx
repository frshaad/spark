'use client';

import { Bell, Loader2 } from 'lucide-react';
import FeedSkeleton from '@/components/feed.skeleton';
import InfiniteScrollContainer from '@/components/infinite-scroll-container';
import { getNotificationsQuery } from '@/lib/queries';
import { useInfiniteQuery } from '@tanstack/react-query';
import Notification from './notification';

export default function Notifications() {
  const { data, status, hasNextPage, isFetching, fetchNextPage } =
    useInfiniteQuery(getNotificationsQuery());

  if (status === 'pending') {
    return <FeedSkeleton count={5} />;
  }

  if (status === 'error') {
    return <div>Error loading notifications</div>;
  }

  const notifications = data.pages.flatMap((page) => page.notifications);

  if (status === 'success' && !notifications.length && !hasNextPage) {
    return (
      <p className="text-muted-foreground text-center">
        You don't have any bookmarks yet.
      </p>
    );
  }

  return (
    <>
      <h1 className="mb-8 flex items-center gap-4 text-2xl font-bold">
        <Bell className="relative top-px" />
        Notifications
      </h1>
      <InfiniteScrollContainer
        className="space-y-3"
        onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
      >
        <>
          {notifications.map((notification) => (
            <Notification key={notification.id} notification={notification} />
          ))}
        </>
        {isFetching && <Loader2 className="mx-auto my-3 animate-spin" />}
      </InfiniteScrollContainer>
    </>
  );
}
