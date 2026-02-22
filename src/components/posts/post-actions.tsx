import { BookmarkInfo, LikeInfo, PostRecord } from '@/lib/types';
import BookmarkButton from './bookmark-button';
import CommentButton from './comment-button';
import LikeButton from './like-button';

type PostActionsProps = {
  post: PostRecord;
};

export default function PostActions({ post }: PostActionsProps) {
  const authenticatedUserId = '';

  const initialLikesState: LikeInfo = {
    likesCount: post._count.likes,
    isLiked: post.likes.some((p) => p.userId === authenticatedUserId),
  };

  const initialBookmarkState: BookmarkInfo = {
    isBookmarked: post.bookmarks.some((p) => p.userId === authenticatedUserId),
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        <LikeButton postId={post.id} initialState={initialLikesState} />
        <CommentButton post={post} />
      </div>
      <BookmarkButton postId={post.id} initialState={initialBookmarkState} />
    </div>
  );
}
