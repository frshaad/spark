import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function PostSkeleton() {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-3">
          {/* Avatar */}
          <Skeleton className="size-10 rounded-full" />

          <div className="min-w-0 flex-1">
            {/* Header line */}
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-4 w-28" /> {/* display name */}
              <Skeleton className="h-4 w-20" /> {/* username */}
              <Skeleton className="h-4 w-10" /> {/* date */}
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[70%]" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
