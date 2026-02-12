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

export const userDataSelect = {
  id: true,
  username: true,
  displayUsername: true,
  image: true,
  name: true,
} satisfies UserSelect;

export const postDataInclude = {
  author: {
    select: userDataSelect,
  },
} satisfies PostInclude;

type PostDataGenerated = PostGetPayload<{
  include: typeof postDataInclude;
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

/**
 * Helper function to check if a post is onboarded
 */
export function isOnboardedPost(post: PostDataGenerated): post is PostData {
  return post.author.username !== null;
}
