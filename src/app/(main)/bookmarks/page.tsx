import type { Metadata } from 'next';
import BookmarksFeed from '@/components/bookmarks-feed';
import DiscoveryPanel from '@/components/discovery-panel';
import { requireAuth } from '@/lib/session';

export default async function BookmarksPage() {
  await requireAuth();

  return (
    <div className='flex w-full gap-6 lg:pr-10 xl:gap-10'>
      <main className='no-scrollbar mx-auto w-11/12 max-w-4xl space-y-5 overflow-y-auto p-1 py-4 lg:min-w-sm'>
        <BookmarksFeed />
      </main>
      <DiscoveryPanel />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Bookmarks',
};
