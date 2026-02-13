import { Route } from 'next';
import {
  PostGetPayload,
  PostInclude,
  UserSelect,
} from '@/generated/prisma/models';

export type NavigationButton = {
  href: Route;
  label: string;
  Icon: React.ReactNode;
  className?: string;
};

export function getUserDataSelect(authenticatedUserId: string) {
  return {
    id: true,
    username: true,
    displayUsername: true,
    image: true,
    name: true,
    followers: {
      where: { followerId: authenticatedUserId },
      select: { followerId: true },
    },
    _count: {
      select: { followers: true },
    },
  } satisfies UserSelect;
}

export function getPostDataInclude(authenticatedUserId: string) {
  return {
    author: {
      select: getUserDataSelect(authenticatedUserId),
    },
  } satisfies PostInclude;
}

type PostDataGenerated = PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>;
}>;

export type OnboardedUser = Omit<PostDataGenerated['author'], 'username'> & {
  username: string;
};

export type PostData = Omit<PostDataGenerated, 'author'> & {
  author: OnboardedUser;
};

export type PostsPage = {
  posts: PostData[];
  nextCursor: string | null;
};

export type UserFollowersSummary = {
  totalFollowers: number;
  isFollowedByViewer: boolean;
};

/**
 * Helper function to check if a post is onboarded
 */
export function isOnboardedPost(post: PostDataGenerated): post is PostData {
  return post.author.username !== null;
}
