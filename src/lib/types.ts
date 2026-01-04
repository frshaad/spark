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
} satisfies UserSelect;

export const postDataInclude = {
  author: {
    select: userDataSelect,
  },
} satisfies PostInclude;

export type PostData = PostGetPayload<{
  include: typeof postDataInclude;
}>;

export type PostsPage = {
  posts: PostData[];
  nextCursor: string | null;
};
