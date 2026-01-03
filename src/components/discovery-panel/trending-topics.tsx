import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TopicsList from './topics-list';

export default function TrendingTopics() {
  return (
    <Card className="gap-1">
      <CardHeader>
        <CardTitle className="text-lg">Trending Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading...</div>}>
          <TopicsList />
        </Suspense>
      </CardContent>
    </Card>
  );
}
