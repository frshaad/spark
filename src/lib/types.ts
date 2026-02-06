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

// Override the author type to require username
export type PostData = Omit<PostDataGenerated, 'author'> & {
  author: Omit<PostDataGenerated['author'], 'username'> & {
    username: string;
  };
};

export type PostsPage = {
  posts: PostData[];
  nextCursor: string | null;
};
