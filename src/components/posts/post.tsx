import { Heart, MessageCircle, Repeat2, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import UserAvatar from '@/components/user-avatar';
import { PostData } from '@/lib/dal/post';
import { formatPostDate } from '@/lib/time';

export default function Post({ post }: { post: PostData }) {
  const isLiked = false;

  return (
    <Card className="border-border hover:bg-accent/50 shadow-none transition-colors">
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Avatar */}
          <UserAvatar
            name={post.author.displayUsername || ''}
            image={post.author.image || '/placeholder.svg'}
          />

          {/* Content */}
          <div className="min-w-0 flex-1">
            {/* Header */}
            <div className="mb-1 flex items-center gap-2">
              <span className="text-sm font-semibold">
                {post.author.displayUsername || 'Unknown'}
              </span>
              <span className="text-muted-foreground text-sm">
                @{post.author.username || 'unknown'}
              </span>
              <span className="text-muted-foreground text-sm">·</span>
              <span className="text-muted-foreground text-sm">
                {formatPostDate(post.createdAt)}
              </span>
            </div>

            {/* Post Content */}
            <p className="mb-3 text-sm leading-relaxed">{post.content}</p>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-sm"
                className="hover:bg-primary/10 hover:text-primary group -ml-2"
              >
                <MessageCircle className="group-hover:fill-primary/20 size-4" />
              </Button>
              {/*<span className="text-muted-foreground min-w-4 text-xs">
                {comments > 0 && comments}
              </span>*/}

              <Button
                variant="ghost"
                size="icon-sm"
                className="group ml-2 hover:bg-green-500/10 hover:text-green-600"
              >
                <Repeat2 className="size-4" />
              </Button>
              {/*<span className="text-muted-foreground min-w-4 text-xs">
                {reposts > 0 && reposts}
              </span>*/}

              <Button
                variant="ghost"
                size="icon-sm"
                className="group ml-2 hover:bg-red-500/10 hover:text-red-600"
                // onClick={handleLike}
              >
                <Heart
                  className={`size-4 transition-all ${isLiked ? 'fill-red-600 text-red-600' : 'group-hover:fill-red-600/20'}`}
                />
              </Button>
              {/*<span
                className={`min-w-4 text-xs ${isLiked ? 'text-red-600' : 'text-muted-foreground'}`}
              >
                {likeCount > 0 && likeCount}
              </span>*/}

              <Button
                variant="ghost"
                size="icon-sm"
                className="hover:bg-primary/10 hover:text-primary group ml-2"
              >
                <Share className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
