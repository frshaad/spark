'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';
import { Button } from '@/components/ui/button';
import { NavigationButton } from '@/lib/types';

export default function NavButton({ href, label, Icon }: NavigationButton) {
  const pathname = usePathname();
  const matches = useMediaQuery('(max-width: 1024px)');

  const isActive =
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link href={href} className="relative max-lg:w-full">
      <Button
        variant={isActive && matches ? 'default' : 'ghost'}
        size="lg"
        className="h-16 w-full gap-4 rounded-full px-4 text-lg lg:h-14 lg:justify-start"
      >
        {Icon}
        <span className="max-lg:hidden">{label}</span>
      </Button>
      {isActive && (
        <span className="bg-primary absolute top-1/2 -left-4 size-2 -translate-y-1/2 rounded-full max-lg:hidden" />
      )}
    </Link>
  );
}
