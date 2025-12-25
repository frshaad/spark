import Logo from '@/components/logo';
import NavButton from './nav-button';
import { NAV_LINKS } from './navbar.constants';
import ProfileButton from './profile-button';

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
