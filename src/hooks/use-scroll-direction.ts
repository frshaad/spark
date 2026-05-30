'use client'

import { useEffect, useRef, useState } from 'react'

interface UseScrollDirectionOptions {
  threshold?: number
  debounceMs?: number
}

/**
 * Hook that tracks scroll direction and returns visibility state for hide-on-scroll animations
 * @param threshold - Minimum scroll distance (px) to trigger direction change (default: 50)
 * @param debounceMs - Debounce delay (ms) to prevent constant toggling (default: 150)
 * @returns Object with isVisible boolean that hides on scroll down, shows on scroll up
 */
export function useScrollDirection({
  threshold = 50,
  debounceMs = 150,
}: UseScrollDirectionOptions = {}) {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollYRef = useRef(0)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      debounceTimerRef.current = setTimeout(() => {
        const scrollDifference = Math.abs(currentScrollY - lastScrollYRef.current)

        if (scrollDifference > threshold) {
          const isScrollingDown = currentScrollY > lastScrollYRef.current
          setIsVisible(!isScrollingDown)
          lastScrollYRef.current = currentScrollY
        }
      }, debounceMs)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [threshold, debounceMs])

  return { isVisible }
}
