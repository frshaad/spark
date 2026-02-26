'use client'

import type { VariantProps } from 'class-variance-authority'
import type { Route } from 'next'
import { LoaderCircle } from 'lucide-react'
import type { buttonVariants } from '@/components/ui/button'
import type { Provider } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { useSocialSignIn } from '@/hooks/use-social-auth'
import LastUsedMethodBadge from './last-method-badge'

type Props = {
  provider: Provider
  redirectTo?: Route
  icon: React.ReactNode
  label?: string
} & React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export default function SocialSignIn({ provider, icon, label, ...props }: Props) {
  const { signIn, isPending, isProviderLastMethod } = useSocialSignIn(provider)

  return (
    <Button
      variant='outline'
      type='button'
      className='relative w-full'
      onClick={signIn}
      disabled={isPending}
      {...props}
    >
      {isPending ? (
        <div className='flex items-center gap-2'>
          <LoaderCircle className='animate-spin' /> <span>Please wait...</span>
        </div>
      ) : (
        <span className='flex items-center'>
          <span className='mr-2'>{icon}</span> Continue with
          <span className='ml-1 capitalize'>{label || provider}</span>
        </span>
      )}
      {isProviderLastMethod && <LastUsedMethodBadge />}
    </Button>
  )
}
