'use client'

import React from 'react'
import { useScrollDirection } from '@/hooks/use-scroll-direction'

interface MobileNavWrapperProps {
  headerContent: React.ReactNode
  bottomNavContent: React.ReactNode
}

export default function MobileNavWrapper({
  headerContent,
  bottomNavContent,
}: MobileNavWrapperProps) {
  const { isVisible } = useScrollDirection({ threshold: 50 })

  return (
    <>
      <header
        className='border-border bg-card/95 supports-backdrop-filter:bg-card/80 sticky top-0 z-50 flex items-center justify-between border-b px-8 py-0.5 backdrop-blur transition-all duration-300 lg:hidden'
        style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-100%)' }}
      >
        {headerContent}
      </header>

      <nav
        className='border-border bg-card/95 supports-backdrop-filter:bg-card/80 fixed right-0 bottom-0 left-0 z-50 flex items-center justify-around border-t px-1 py-0.5 backdrop-blur transition-all duration-300 lg:hidden'
        style={{ transform: isVisible ? 'translateY(0)' : 'translateY(100%)' }}
      >
        {bottomNavContent}
      </nav>
    </>
  )
}
