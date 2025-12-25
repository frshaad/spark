import { Bell, Bookmark, House, Send } from 'lucide-react';
import { NavigationButton } from '@/lib/types';

export const NAV_LINKS: NavigationButton[] = [
  {
    href: '/',
    label: 'Home',
    Icon: <House className="size-6" />,
  },
  {
    href: '/notifications',
    label: 'Notifications',
    Icon: <Bell className="size-6" />,
  },
  {
    href: '/direct',
    label: 'Messages',
    Icon: <Send className="size-6" />,
  },
  {
    href: '/bookmarks',
    label: 'Bookmarks',
    Icon: <Bookmark className="size-6" />,
  },
];
