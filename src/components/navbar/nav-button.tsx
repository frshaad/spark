'use client'

import { Dot } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMediaQuery } from 'usehooks-ts'
import type { NavigationButton } from '@/lib/types'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavButtonProps extends NavigationButton {
  counter?: string | null
}

export default function NavButton({ href, label, Icon, counter }: NavButtonProps) {
  const pathname = usePathname()
  const matches = useMediaQuery('(max-width: 1024px)')

  const isActive =
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link href={href} className='relative w-60 max-lg:w-full'>
      <Button
        variant={isActive && matches ? 'default' : 'ghost'}
        size='lg'
        className='h-16 w-full gap-4 rounded-full px-4 text-lg lg:h-14 lg:justify-start'
      >
        {Icon}
        <span className='max-lg:hidden'>{label}</span>
        <span
          className={cn(
            buttonVariants({ variant: 'destructive', size: 'xs' }),
            'rounded-full transition max-lg:hidden',
            !counter && 'opacity-0',
          )}
        >
          {counter ?? ''}
        </span>
        {counter && (
          <span className='absolute bottom-0 translate-y-1 lg:hidden'>
            <Dot className='text-destructive size-8' />
          </span>
        )}
      </Button>
      {isActive && (
        <span className='bg-primary absolute top-1/2 -left-4 size-2 -translate-y-1/2 rounded-full max-lg:hidden' />
      )}
    </Link>
  )
}
