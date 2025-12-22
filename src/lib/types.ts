import { Route } from 'next';

export type NavigationButton = {
  href: Route;
  label: string;
  Icon: React.ReactNode;
  className?: string;
};
