'use client';

import { Button } from '@/components/ui/button';
import { useSignOut } from '@/hooks/use-sign-out';

export default function SignOutButton() {
  const { signOut, isPending } = useSignOut();

  return (
    <Button variant="destructive" onClick={signOut} disabled={isPending}>
      Sign Out
    </Button>
  );
}
