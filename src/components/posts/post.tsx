'use client';

import { Route } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import UserAvatar from '@/components/user-avatar';
import { formatPostDate } from '@/lib/format';
import { PostData } from '@/lib/types';

// import PostActions from './post-actions';

export default function Post({ post }: { post: PostData }) {
  const router = useRouter();
  const postUrl = `/${post.author.username}/${post.id}` as Route;
  const authorUrl = `/${post.author.username}` as Route;

  const navigateToPost = () => {
    router.push(postUrl);
  };

  const handleCardClick = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;

    navigateToPost();
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      className="cursor-pointer"
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigateToPost();
      }}
    >
      <CardContent>
        <div className="flex gap-3">
          <Link href={authorUrl} onClick={stopPropagation}>
            <UserAvatar
              user={{
                image: post.author.image,
                name: post.author.displayUsername ?? post.author.name,
              }}
              className="size-10 transition hover:opacity-80"
            />
          </Link>

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <Link
                href={authorUrl}
                onClick={stopPropagation}
                className="text-sm font-semibold hover:underline"
              >
                {post.author.displayUsername}
              </Link>

              <Link
                href={authorUrl}
                onClick={stopPropagation}
                className="text-muted-foreground text-sm hover:underline"
              >
                @{post.author.username}
              </Link>

              <span className="text-muted-foreground text-sm">·</span>
              <span className="text-muted-foreground text-sm">
                {formatPostDate(post.createdAt)}
              </span>
            </div>

            <p className="mb-3 text-sm leading-relaxed">{post.content}</p>

            {/*<PostActions />*/}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
