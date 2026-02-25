import type { Route } from 'next'
import Link from 'next/link'
import { useMemo } from 'react'
import type { PostView } from '@/lib/types'
import UserTooltip from '@/components/user-tooltip'
import { formatPostDate, isRTL } from '@/lib/format'

export default function PostHeader({
  author,
  authorUrl,
  createdAt,
}: {
  author: PostView['author']
  authorUrl: Route
  createdAt: Date | string
}) {
  const displayName = author.name
  const isRtl = useMemo(() => isRTL(displayName), [displayName])

  return (
    // oxlint-disable click-events-have-key-events, prefer-tag-over-role
    <div role='button' className='min-w-0' onClick={e => e.stopPropagation()}>
      <div className='mb-1 flex items-center gap-2 text-sm'>
        <UserTooltip user={author}>
          <Link
            href={authorUrl}
            onClick={e => e.stopPropagation()}
            className='font-semibold hover:underline'
          >
            <span dir={isRtl ? 'rtl' : 'ltr'}>{displayName}</span>
          </Link>

          <Link
            href={authorUrl}
            onClick={e => e.stopPropagation()}
            className='text-muted-foreground hover:underline'
          >
            <span dir='ltr'>@{author.username}</span>
          </Link>
        </UserTooltip>

        <span className='text-muted-foreground'>·</span>

        <span className='text-muted-foreground'>{formatPostDate(new Date(createdAt))}</span>
      </div>
    </div>
  )
}
