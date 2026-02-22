'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLikePost } from '@/hooks/use-like-post';
import { useLikesSummary } from '@/hooks/use-like-summary';
import { formatCount } from '@/lib/format';
import { LikeInfo } from '@/lib/types';

type LikeButtonProps = {
  postId: string;
  initialState: LikeInfo;
};

export default function LikeButton({ postId, initialState }: LikeButtonProps) {
  const {
    data: { isLiked, likesCount },
  } = useLikesSummary(postId, initialState);

  const { mutate } = useLikePost();

  function handleLike(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    mutate({ postId, isLiked });
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="group ml-2 hover:bg-red-500/10 hover:text-red-600"
      onClick={handleLike}
    >
      <Heart
        className={`size-4 transition-all ${isLiked ? 'fill-red-600 text-red-600' : 'group-hover:fill-red-600/20'}`}
      />
      {likesCount > 0 && (
        <span
          className={`text-right text-xs tabular-nums ${
            isLiked ? 'text-red-600' : 'text-muted-foreground'
          }`}
        >
          {formatCount(likesCount)}
        </span>
      )}
    </Button>
  );
}
