import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TopicsList from './topics-list';
import { TopicsSkeleton } from './topics-list.skeleton';

export default function TrendingTopics() {
  return (
    <Card className='gap-1'>
      <CardHeader>
        <CardTitle className='text-lg'>Trending Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<TopicsSkeleton />}>
          <TopicsList />
        </Suspense>
      </CardContent>
    </Card>
  );
}
