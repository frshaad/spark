'use client';

import { useQuery } from '@tanstack/react-query';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookmarkPost } from '@/hooks/use-bookmark-post';
import { getBookmarkInfoQuery } from '@/lib/queries';
import { BookmarkInfo } from '@/lib/types';
import { cn } from '@/lib/utils';

type BookmarkButtonProps = {
  postId: string;
  initialState: BookmarkInfo;
};

export default function BookmarkButton({ initialState, postId }: BookmarkButtonProps) {
  const {
    data: { isBookmarked },
  } = useQuery(getBookmarkInfoQuery(postId, initialState));

  const { mutate } = useBookmarkPost();

  function handleBookmark(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    mutate({ postId, isBookmarked });
  }

  return (
    <Button
      variant='ghost'
      size='icon-sm'
      className='hover:bg-primary/10 hover:text-primary group ml-2'
      onClick={handleBookmark}
    >
      <Bookmark
        className={cn(
          'size-4',
          isBookmarked ? 'fill-primary text-primary' : 'group-hover:fill-primary/20',
        )}
      />
    </Button>
  );
}
