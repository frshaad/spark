'use client';

import { Route } from 'next';
import { type VariantProps } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { useSocialSignIn } from '@/hooks/use-social-auth';
import { type Provider } from '@/lib/auth';
import LastUsedMethodBadge from './last-method-badge';

type Props = {
  provider: Provider;
  redirectTo?: Route;
  icon: React.ReactNode;
  label?: string;
} & React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export default function SocialSignIn({
  provider,
  icon,
  label,
  ...props
}: Props) {
  const { signIn, isPending, isProviderLastMethod } = useSocialSignIn(provider);

  return (
    <Button
      variant="outline"
      type="button"
      className="relative w-full"
      onClick={signIn}
      disabled={isPending}
      {...props}
    >
      {isPending ? (
        <div className="flex items-center gap-2">
          <LoaderCircle className="animate-spin" /> <span>Please wait...</span>
        </div>
      ) : (
        <span className="flex items-center">
          <span className="mr-2">{icon}</span> Continue with
          <span className="ml-1 capitalize">{label || provider}</span>
        </span>
      )}
      {isProviderLastMethod && <LastUsedMethodBadge />}
    </Button>
  );
}
