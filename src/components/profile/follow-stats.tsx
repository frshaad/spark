'use client'

import type { FollowInfo } from '@/lib/types'
import { useFollowerSummary } from '@/hooks/use-follower-summary'
import { formatCount } from '@/lib/format'
import StatBlock from './stat-block'

type FollowStatsProps = {
  targetUserId: string
  initialState: FollowInfo
}

export default function FollowStats({ targetUserId, initialState }: FollowStatsProps) {
  const { data } = useFollowerSummary(targetUserId, initialState)

  return (
    <>
      <StatBlock value={formatCount(data.followersCount)} label='Followers' />
      <StatBlock value={formatCount(data.followingCount)} label='Following' />
    </>
  )
}
