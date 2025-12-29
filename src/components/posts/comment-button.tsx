import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CommentButton() {
  const commentCount = 10;

  return (
    <Button
      variant="ghost"
      size="sm"
      className="hover:bg-primary/10 hover:text-primary group -ml-2"
    >
      <MessageCircle className="group-hover:fill-primary/20 size-4" />
      <span className="text-muted-foreground min-w-4 text-xs">
        {commentCount > 0 && commentCount}
      </span>
    </Button>
  );
}
