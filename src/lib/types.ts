import { Route } from 'next';
import {
  CommentGetPayload,
  CommentInclude,
  PostGetPayload,
  PostInclude,
  UserGetPayload,
  UserSelect,
} from '@/generated/prisma/models';

//
// ─────────────────────────────────────────────
// UI Types
// ─────────────────────────────────────────────
//

export type NavigationButton = {
  href: Route;
  label: string;
  Icon: React.ReactNode;
  className?: string;
};

//
// ─────────────────────────────────────────────
// Prisma Select / Include Helpers
// ─────────────────────────────────────────────
//

export function buildUserSelect(viewerId: string) {
  return {
    id: true,
    username: true,
    displayUsername: true,
    image: true,
    name: true,
    bio: true,
    createdAt: true,

    followers: {
      where: { followerId: viewerId },
      select: { followerId: true },
    },

    _count: {
      select: { followers: true, posts: true, following: true },
    },
  } satisfies UserSelect;
}

export function buildPostInclude(viewerId: string) {
  return {
    author: {
      select: buildUserSelect(viewerId),
    },
    attachments: true,
    likes: {
      where: { userId: viewerId },
      select: { userId: true },
    },
    bookmarks: {
      where: { userId: viewerId },
      select: { userId: true },
    },
    _count: { select: { likes: true, comments: true } },
  } satisfies PostInclude;
}

export function buildCommentInclude(viewerId: string) {
  return {
    author: {
      select: buildUserSelect(viewerId),
    },
  } satisfies CommentInclude;
}

//
// ─────────────────────────────────────────────
// Prisma Derived Types
// ─────────────────────────────────────────────
//

export type UserRecord = UserGetPayload<{
  select: ReturnType<typeof buildUserSelect>;
}>;

export type PostRecord = PostGetPayload<{
  include: ReturnType<typeof buildPostInclude>;
}>;

export type CommentRecord = CommentGetPayload<{
  include: ReturnType<typeof buildCommentInclude>;
}>;

type AuthorFromPost = PostRecord['author'];

//
// ─────────────────────────────────────────────
// Domain Types
// ─────────────────────────────────────────────
//

export type OnboardedUser = AuthorFromPost & {
  username: string; // ensures non-null
};

export type PostView = Omit<PostRecord, 'author'> & {
  author: OnboardedUser;
};

export type CommentView = Omit<CommentRecord, 'author'> & {
  author: OnboardedUser;
};

export type CursorPaginatedPosts = {
  posts: PostView[];
  nextCursor: string | null;
};

export type CursorPaginatedComments = {
  comments: CommentRecord[];
  nextCursor: string | null;
};

export type FollowInfo = {
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
};

export type LikeInfo = {
  likesCount: number;
  isLiked: boolean;
};

export type BookmarkInfo = {
  isBookmarked: boolean;
};

export type Attachment = {
  mediaId?: string;
  file: File;
  isUploading: boolean;
};

//
// ─────────────────────────────────────────────
// Type Guards
// ─────────────────────────────────────────────
//

/**
 * Ensures post author has completed onboarding
 */
export function isOnboardedPost(post: PostRecord): post is PostView {
  return post.author.username !== null;
}
