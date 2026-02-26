'use client'

import { UserPlus } from 'lucide-react'
import type { FollowInfo } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { useFollow } from '@/hooks/use-follow'
import { useFollowerSummary } from '@/hooks/use-follower-summary'
import { cn } from '@/lib/utils'

type FollowButtonProps = {
  targetUserId: string
  initialState: FollowInfo
  className?: string
}

export default function FollowButton({
  targetUserId,
  initialState,
  className = '',
}: FollowButtonProps) {
  const { data } = useFollowerSummary(targetUserId, initialState)
  const { isFollowing } = data

  const { mutate } = useFollow()

  return (
    <Button
      variant={isFollowing ? 'secondary' : 'default'}
      onClick={() => mutate({ targetUserId, isFollowing })}
      className={cn('gap-1.5 rounded-full px-4 text-xs font-medium tracking-wide', className)}
    >
      {isFollowing ? (
        'Following'
      ) : (
        <>
          <UserPlus className='size-3.5' />
          Follow
        </>
      )}
    </Button>
  )
}
