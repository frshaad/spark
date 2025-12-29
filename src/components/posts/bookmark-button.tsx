import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function CommentButton() {
  const isBookmarked = true;

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="hover:bg-primary/10 hover:text-primary group ml-2"
    >
      <Bookmark
        className={cn(
          'size-4',
          isBookmarked
            ? 'fill-primary text-primary'
            : 'group-hover:fill-primary/20',
        )}
      />
    </Button>
  );
}
