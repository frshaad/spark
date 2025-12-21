'use client';

import { useState, useTransition } from 'react';
import type { Route } from 'next';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { loginSchema } from '@/lib/validation/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export function useLoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const searchParams = useSearchParams();
  const callbackURL = (searchParams.get('redirect') || '/dashboard') as Route;

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const handleSubmit = form.handleSubmit((data) => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await authClient.signIn.email(data);

        if (result.error) {
          setError(result.error.message || 'Something went wrong');
        } else {
          toast.success('Welcome back!');
          router.push(callbackURL);
        }
      } catch {
        setError('An unexpected error occurred');
      }
    });
  });

  const lastMethod = authClient.getLastUsedLoginMethod();
  const togglePasswordVisibility = () => setPasswordVisible((c) => !c);

  return {
    control: form.control,
    handleSubmit,
    isPending,
    error,
    lastMethod,
    passwordVisible,
    togglePasswordVisibility,
  };
}
