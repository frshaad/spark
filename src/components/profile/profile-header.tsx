import { CalendarDays } from 'lucide-react'
import type { FollowInfo, UserRecord } from '@/lib/types'
import FollowButton from '@/components/follow-button'
import Linkify from '@/components/linkify'
import UserAvatar from '@/components/user-avatar'
import { formatCount, formatJoinedDate } from '@/lib/format'
import EditProfileButton from './edit-profile-button'
import FollowStats from './follow-stats'
import StatBlock from './stat-block'

type ProfileHeaderProps = {
  user: UserRecord
  authenticatedUserId: string
}

export default function ProfileHeader({ user, authenticatedUserId }: ProfileHeaderProps) {
  const followInfo: FollowInfo = {
    followersCount: user._count.followers,
    followingCount: user._count.following,
    isFollowing: user.followers.some(({ followerId }) => followerId === authenticatedUserId),
  }

  return (
    <section aria-label='Profile information' className='px-6 py-6 md:px-10 md:py-8'>
      {/* Top row: avatar + actions */}
      <div className='mb-4 flex items-center gap-4'>
        <UserAvatar user={{ name: user.name, image: user.image }} className='size-20 md:size-24' />

        <div className='min-w-0 flex-1'>
          <h1 className='text-foreground truncate text-2xl leading-tight tracking-tight md:text-3xl'>
            {user.name}
          </h1>
          <p className='text-muted-foreground text-sm tracking-wide'>@{user.username}</p>
        </div>

        {user.id === authenticatedUserId ? (
          <EditProfileButton user={user} />
        ) : (
          <FollowButton targetUserId={user.id} initialState={followInfo} />
        )}
      </div>

      {/* Bio */}
      {user.bio && (
        <Linkify>
          <p className='text-foreground/80 mb-3 max-w-lg text-[15px] leading-relaxed text-pretty'>
            {user.bio}
          </p>
        </Linkify>
      )}

      {/* Joined date */}
      <span className='text-muted-foreground mb-5 flex items-center gap-1.5 text-sm'>
        <CalendarDays className='h-3.5 w-3.5' />
        Joined {formatJoinedDate(user.createdAt)}
      </span>

      {/* Stats row */}
      <div className='flex items-center gap-8 md:gap-10'>
        <StatBlock value={formatCount(user._count.posts)} label='Posts' />
        <FollowStats targetUserId={user.id} initialState={followInfo} />
      </div>
    </section>
  )
}
