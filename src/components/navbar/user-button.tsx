'use client';

import Link from 'next/link';
import { User } from 'better-auth';
import { CircleUser, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from '../mode-toggle';

export default function UserButton({
  name,
  username,
  image,
}: Pick<User, 'image' | 'name' | 'username'>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-10 flex h-14 w-full cursor-pointer items-center justify-start gap-5 rounded-full text-lg">
        <Avatar>
          <AvatarImage src={image ?? undefined} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <span>{name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <Link href={`/${username}`}>
            <DropdownMenuItem>
              <CircleUser />
              Profile
            </DropdownMenuItem>
          </Link>

          <ModeToggle />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
