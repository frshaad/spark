'use client';

import { useEffect, useState, useTransition } from 'react';
import { Route } from 'next';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Provider } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';

export function useSocialSignIn(provider: Provider) {
  const searchParams = useSearchParams();
  const callbackURL = (searchParams.get('redirect') || '/') as Route;

  const [isProviderLastMethod, setIsProviderLastMethod] = useState(false);
  useEffect(() => {
    setIsProviderLastMethod(authClient.isLastUsedLoginMethod(provider));
  }, [provider]);

  const [isPending, startTransition] = useTransition();

  function signInSocial() {
    startTransition(async () => {
      try {
        const { error } = await authClient.signIn.social({
          provider,
          callbackURL,
        });
        if (error) {
          toast.error(error.message || 'An error occurred');
        } else {
          toast.success('Signed in successfully');
        }
      } catch {
        toast.error('An error occurred');
      }
    });
  }

  return { isPending, signIn: signInSocial, isProviderLastMethod };
}
