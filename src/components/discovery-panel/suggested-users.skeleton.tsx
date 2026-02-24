import { Button } from '@/components/ui/button';
import { Item, ItemActions, ItemContent, ItemTitle } from '@/components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';

export function SuggestedUsersSkeleton({ count = 5 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Item key={i}>
          <ItemContent>
            <ItemTitle>
              {/* Avatar */}
              <Skeleton className='size-9 rounded-full' />

              <div className='space-y-1'>
                <Skeleton className='h-4 w-28' />
                <Skeleton className='h-3 w-20' />
              </div>
            </ItemTitle>
          </ItemContent>

          <ItemActions>
            <Button variant='outline' size='sm' disabled>
              <Skeleton className='h-4 w-14' />
            </Button>
          </ItemActions>
        </Item>
      ))}
    </>
  );
}
