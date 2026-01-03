import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SuggestedUsersList from './suggested-users';

export default function WhoToFollow() {
  return (
    <Card className="gap-1">
      <CardHeader>
        <CardTitle className="text-lg">Who to follow</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Suspense fallback={<div>Loading...</div>}>
          <SuggestedUsersList />
        </Suspense>
      </CardContent>
    </Card>
  );
}
