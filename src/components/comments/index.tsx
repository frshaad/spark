'use client';

import { getCommentsQuery } from '@/lib/queries';
import type { PostView } from '@/lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import Comment from './comment';
import CommentSkeleton from './comment.skeleton';

type CommentsProps = {
  post: PostView;
};

export default function Comments({ post }: CommentsProps) {
  const { data, status, hasNextPage, isFetching, fetchNextPage } =
    useInfiniteQuery(getCommentsQuery(post.id));

  if (status === 'pending') {
    return (
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <CommentSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return <div>Error loading posts</div>;
  }

  const comments = data.pages.flatMap((page) => page.comments);

  if (status === 'success' && !comments.length && !hasNextPage) {
    return (
      <p className="text-muted-foreground text-center">
        No one has commented yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
