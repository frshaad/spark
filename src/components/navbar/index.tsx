import Link from 'next/link';
import { Search } from 'lucide-react';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import NavButton from './nav-button';
import { NAV_LINKS } from './navbar.constants';
import ProfileButton from './profile-button';

export default function Navbar() {
  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile/tablet */}
      <aside className="hidden max-w-lg flex-col justify-between px-10 lg:flex lg:pb-6">
        <Logo />

        <nav className="flex flex-col max-lg:gap-3">
          {NAV_LINKS.map((item) => (
            <NavButton key={item.href} {...item} />
          ))}
        </nav>

        <ProfileButton />
      </aside>

      {/* Mobile/Tablet Top Bar - Sticky */}
      <header className="border-border bg-card/95 supports-backdrop-filter:bg-card/80 sticky top-0 z-50 flex items-center justify-between border-b px-8 py-1 backdrop-blur lg:hidden">
        <Logo />

        <div className="flex items-center gap-5">
          <Link href="/search">
            <Button variant="ghost" size="icon-lg">
              <Search className="size-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>

          <ProfileButton />
        </div>
      </header>

      {/* Mobile/Tablet Bottom Navigation */}
      <nav className="border-border bg-card/95 supports-backdrop-filter:bg-card/80 fixed right-0 bottom-0 left-0 z-50 flex items-center justify-around border-t p-1 backdrop-blur lg:hidden">
        {NAV_LINKS.map((item) => (
          <NavButton key={item.href} {...item} />
        ))}
      </nav>
    </>
  );
}
