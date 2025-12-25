import { Bell, Bookmark, House, Send } from 'lucide-react';
import Logo from '@/components/logo';
import { NavigationButton } from '@/lib/types';
import NavButton from './nav-button';
import ProfileButton from './profile-button';

const NAV_LINKS: NavigationButton[] = [
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

export default function Navbar() {
  return (
    <aside className="flex max-w-sm flex-col justify-between py-8 pr-10 pl-2 max-lg:pr-2 max-md:hidden">
      <Logo />

      <nav className="flex flex-col max-lg:gap-3">
        {NAV_LINKS.map((item) => (
          <NavButton key={item.href} {...item} />
        ))}
      </nav>

      <ProfileButton />
    </aside>
  );
}
