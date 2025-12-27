'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { signupSchema } from '@/lib/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';

export function useSignupForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = form.handleSubmit((inputs) => {
    setError(null);
    startTransition(async () => {
      try {
        const { error } = await authClient.signUp.email(inputs);

        if (error) {
          setError(error.message || 'Something went wrong');
        } else {
          toast.success('Account created successfully!');
          router.push('/');
        }
      } catch {
        setError('An unexpected error occurred');
      }
    });
  });

  const togglePasswordVisibility = () => setPasswordVisible((c) => !c);

  return {
    control: form.control,
    handleSubmit,
    isPending,
    error,
    passwordVisible,
    togglePasswordVisibility,
  };
}
