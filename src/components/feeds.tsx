import FollowingFeed from '@/components/following-feed';
import ForYouFeed from '@/components/for-you-feed';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Feeds() {
  return (
    <Tabs defaultValue="for-you">
      <TabsList>
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
  );
}
