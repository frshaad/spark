import BookmarkButton from './bookmark-button';
import CommentButton from './comment-button';
import LikeButton from './like-button';

export default function PostActions() {
  function stopPropagation(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <div className="flex items-center gap-10" onClick={stopPropagation}>
      <LikeButton />
      <CommentButton />
      <BookmarkButton />
    </div>
  );
}
