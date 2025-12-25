'use client';

import { useCallback } from 'react';
import { useTheme } from 'next-themes';
import { ChevronRight, MonitorCog, Moon, Sun, SunMoon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const setLight = useCallback(() => setTheme('light'), [setTheme]);
  const setDark = useCallback(() => setTheme('dark'), [setTheme]);
  const setSystem = useCallback(() => setTheme('system'), [setTheme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:bg-accent hover:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive not-data-[variant=destructive]:focus:**:text-accent-foreground group/dropdown-menu-item relative flex w-full cursor-default items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm capitalize outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
        <span className="flex items-center gap-2">
          <SunMoon /> Update Mode
        </span>
        <ChevronRight />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-fit">
        <DropdownMenuItem
          onClick={setLight}
          className={cn(theme === 'light' && 'bg-secondary')}
        >
          <Sun />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={setDark}
          className={cn(theme === 'dark' && 'bg-secondary')}
        >
          <Moon /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={setSystem}
          className={cn(theme === 'system' && 'bg-secondary')}
        >
          <MonitorCog />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
