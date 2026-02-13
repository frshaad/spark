import { Route } from 'next';
import {
  PostGetPayload,
  PostInclude,
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

    followers: {
      where: { followerId: viewerId },
      select: { followerId: true },
    },

    _count: {
      select: { followers: true },
    },
  } satisfies UserSelect;
}

export function buildPostInclude(viewerId: string) {
  return {
    author: {
      select: buildUserSelect(viewerId),
    },
  } satisfies PostInclude;
}

//
// ─────────────────────────────────────────────
// Prisma Derived Types
// ─────────────────────────────────────────────
//

export type PostRecord = PostGetPayload<{
  include: ReturnType<typeof buildPostInclude>;
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

export type CursorPaginatedPosts = {
  posts: PostView[];
  nextCursor: string | null;
};

export type FollowRelationship = {
  followersCount: number;
  isFollowing: boolean;
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
