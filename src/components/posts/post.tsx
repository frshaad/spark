'use client';

import { useState } from 'react';
import { Route } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EllipsisVertical, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserAvatar from '@/components/user-avatar';
import { useDeletePost } from '@/hooks/use-delete-post';
import { authClient } from '@/lib/auth-client';
import { formatPostDate, isRTL } from '@/lib/format';
import { PostData } from '@/lib/types';
import { cn } from '@/lib/utils';

// import PostActions from './post-actions';

export default function Post({ post }: { post: PostData }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data } = authClient.useSession();
  const router = useRouter();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  function handleDeletePost() {
    deletePost(post.id, {
      onSuccess() {
        setIsDialogOpen(false);
      },
    });
  }

  const postUrl = `/${post.author.username}/${post.id}` as Route;
  const authorUrl = `/${post.author.username}` as Route;
  const isRtl = isRTL(post.content);

  const navigateToPost = () => {
    router.push(postUrl);
  };

  const handleCardClick = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;

    navigateToPost();
  };

  return (
    <Card className="group/post">
      <CardContent>
        <div className="flex gap-3">
          <Link href={authorUrl}>
            <UserAvatar
              user={{
                image: post.author.image,
                name: post.author.displayUsername ?? post.author.name,
              }}
              className="size-10 transition hover:opacity-80"
            />
          </Link>

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Link
                  href={authorUrl}
                  className="text-sm font-semibold hover:underline"
                >
                  {post.author.displayUsername}
                </Link>

                <Link
                  href={authorUrl}
                  className="text-muted-foreground text-sm hover:underline"
                >
                  @{post.author.username}
                </Link>

                <span className="text-muted-foreground text-sm">·</span>
                <span className="text-muted-foreground text-sm">
                  {formatPostDate(post.createdAt)}
                </span>
              </div>

              {post.authorId === data?.user.id && (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="ghost" />}
                    className="opacity-0 transition-opacity group-hover/post:opacity-100"
                  >
                    <EllipsisVertical />
                  </DropdownMenuTrigger>

                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DropdownMenuContent>
                      <DropdownMenuItem variant="destructive">
                        <DialogTrigger className="flex w-full items-center gap-2">
                          <Trash /> Delete
                        </DialogTrigger>
                      </DropdownMenuItem>
                    </DropdownMenuContent>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete post?</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this post? This action
                          cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose
                          render={
                            <Button variant="outline" disabled={isDeleting}>
                              Cancel
                            </Button>
                          }
                        />
                        <Button
                          type="submit"
                          variant="destructive"
                          onClick={handleDeletePost}
                          disabled={isDeleting}
                        >
                          {isDeleting ? 'Deleting...' : 'Delete'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </DropdownMenu>
              )}
            </div>

            <div onClick={handleCardClick} className="cursor-pointer">
              <p
                dir={isRtl ? 'rtl' : 'ltr'}
                className={cn(
                  'mb-3 text-sm leading-relaxed',
                  isRtl ? 'font-vazir text-right' : 'font-inter text-left',
                )}
              >
                {post.content}
              </p>
            </div>

            {/*<PostActions />*/}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
