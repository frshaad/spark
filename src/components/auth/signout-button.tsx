'use client'

import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { useSignOut } from '@/hooks/use-sign-out'

export default function SignOutButton() {
  const { signOut, isPending } = useSignOut()
  const queryClient = useQueryClient()

  return (
    <Button
      variant='destructive'
      onClick={() => {
        queryClient.clear()
        signOut()
      }}
      disabled={isPending}
    >
      Sign Out
    </Button>
  )
}
