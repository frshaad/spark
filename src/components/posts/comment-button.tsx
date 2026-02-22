import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PostRecord } from '@/lib/types';

type CommentButtonProps = {
  post: PostRecord;
};

export default function CommentButton({ post }: CommentButtonProps) {
  const commentCount = post._count.comments;

  return (
    <Link href={`/${post.author.username}/${post.id}`}>
      <Button
        variant="ghost"
        size="sm"
        className="hover:bg-primary/10 hover:text-primary group -ml-2"
      >
        <MessageCircle className="group-hover:fill-primary/20 size-4" />
        {commentCount > 0 && (
          <span className="text-muted-foreground min-w-4 text-xs">
            {commentCount}
          </span>
        )}
      </Button>
    </Link>
  );
}
