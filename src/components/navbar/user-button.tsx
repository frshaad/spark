'use client';

import { Route } from 'next';
import Link from 'next/link';
import { CircleUser, LogOut } from 'lucide-react';
import SignOutButton from '@/components/auth/signout-button';
import { ModeToggle } from '@/components/mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function UserButton({
  name,
  username,
  image,
}: {
  name: string;
  username?: string | null;
  image?: string | null;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="sm" />}
        className="flex h-14 cursor-pointer items-center justify-start gap-3 rounded-full text-lg"
      >
        <Avatar>
          <AvatarImage src={image ?? undefined} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <span className="max-lg:hidden">{name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <Link href={`/${username}` as Route}>
            <DropdownMenuItem
              render={
                <Button variant="ghost" className="w-full justify-start" />
              }
              nativeButton={true}
            >
              <CircleUser />
              Profile
            </DropdownMenuItem>
          </Link>

          <ModeToggle />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <Dialog>
          <DialogTrigger
            data-variant="destructive"
            className="focus:bg-accent hover:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive not-data-[variant=destructive]:focus:**:text-accent-foreground group/dropdown-menu-item relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <LogOut />
            Sign out
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to log out?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <DialogClose className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 group/button bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground inline-flex h-9 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-transparent bg-clip-padding px-2.5 text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:ring-[3px] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                Cancel
              </DialogClose>
              <SignOutButton />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
