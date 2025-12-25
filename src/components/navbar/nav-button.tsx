'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { NavigationButton } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function NavButton({
  href,
  label,
  Icon,
  className = '',
}: NavigationButton) {
  const pathname = usePathname();
  const isActive =
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link href={href}>
      <Button
        variant="ghost"
        size="lg"
        className={cn(
          'relative h-14 w-full justify-start gap-4 rounded-full pl-10 text-lg max-lg:pr-10',
          className,
        )}
      >
        {Icon}
        <span className="max-lg:hidden">{label}</span>
        {isActive && (
          <span className="bg-primary absolute top-1/2 left-4 size-2 -translate-y-1/2 rounded-full" />
        )}
      </Button>
    </Link>
  );
}
