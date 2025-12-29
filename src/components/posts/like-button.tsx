import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LikeButton() {
  const isLiked = false;
  const likeCount = 5;

  function handleLike() {
    console.log('Post liked');
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
      <span
        className={`min-w-4 text-xs ${isLiked ? 'text-red-600' : 'text-muted-foreground'}`}
      >
        {likeCount > 0 && likeCount}
      </span>
    </Button>
  );
}
