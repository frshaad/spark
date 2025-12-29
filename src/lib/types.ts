import { Route } from 'next';
import { PostGetPayload, PostInclude } from '@/generated/prisma/models';

export type NavigationButton = {
  href: Route;
  label: string;
  Icon: React.ReactNode;
  className?: string;
};

export const postDataInclude = {
  author: {
    select: {
      username: true,
      displayUsername: true,
      image: true,
    },
  },
} satisfies PostInclude;

export type PostData = PostGetPayload<{
  include: typeof postDataInclude;
}>;
