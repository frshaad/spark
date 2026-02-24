import { Item, ItemContent, ItemTitle } from '@/components/ui/item'
import { Skeleton } from '@/components/ui/skeleton'

export function TopicsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Item key={i} size='xs'>
          <ItemContent>
            <ItemTitle>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-3 w-16' />
            </ItemTitle>
          </ItemContent>
        </Item>
      ))}
    </>
  )
}
