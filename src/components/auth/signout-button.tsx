'use client';

import { Button } from '@/components/ui/button';
import { useSignOut } from '@/hooks/use-sign-out';
import { useQueryClient } from '@tanstack/react-query';

export default function SignOutButton() {
  const { signOut, isPending } = useSignOut();
  const queryClient = useQueryClient();

  return (
    <Button
      variant="destructive"
      onClick={() => {
        queryClient.clear();
        signOut();
      }}
      disabled={isPending}
    >
      Sign Out
    </Button>
  );
}
