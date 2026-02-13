import DiscoveryPanel from '@/components/discovery-panel';
import FollowingFeed from '@/components/following-feed';
import ForYouFeed from '@/components/for-you-feed';
import PostEditor from '@/components/posts/editor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { requireOnboardedUser } from '@/lib/session';

export default async function Home() {
  const { user } = await requireOnboardedUser();

  return (
    <div className="flex w-full gap-6 lg:pr-10 xl:gap-10">
      <main className="no-scrollbar mx-auto w-11/12 max-w-4xl space-y-5 overflow-y-auto p-1 py-4 lg:min-w-sm">
        <PostEditor
          user={{
            name: user.displayUsername ?? user.name,
            image: user.image ?? null,
          }}
        />
        <Tabs defaultValue="for-you">
          <TabsList className="w-full">
            <TabsTrigger value="for-you" className="cursor-pointer">
              For You
            </TabsTrigger>
            <TabsTrigger value="following" className="cursor-pointer">
              Following
            </TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following">
            <FollowingFeed />
          </TabsContent>
        </Tabs>
      </main>
      <DiscoveryPanel />
    </div>
  );
}
