'use client';

import { useCallback } from 'react';
import { useTheme } from 'next-themes';
import { ChevronRight, MonitorCog, Moon, Sun, SunMoon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const setLight = useCallback(() => setTheme('light'), [setTheme]);
  const setDark = useCallback(() => setTheme('dark'), [setTheme]);
  const setSystem = useCallback(() => setTheme('system'), [setTheme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" className="w-full justify-between" />}
      >
        <span className="flex items-center gap-2">
          <SunMoon /> Update Mode
        </span>
        <ChevronRight />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-fit">
        <DropdownMenuItem
          onClick={setLight}
          render={
            <Button
              variant={theme === 'light' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
            />
          }
        >
          <Sun />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={setDark}
          render={
            <Button
              variant={theme === 'dark' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
            />
          }
        >
          <Moon /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={setSystem}
          render={
            <Button
              variant={theme === 'system' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
            />
          }
        >
          <MonitorCog />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
