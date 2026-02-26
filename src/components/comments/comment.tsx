'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { useMemo } from 'react'
import type { CommentRecord, OnboardedUser } from '@/lib/types'
import PostHeader from '@/components/posts/post-header'
import { Card, CardContent } from '@/components/ui/card'
import UserAvatar from '@/components/user-avatar'
import UserTooltip from '@/components/user-tooltip'
import { isRTL } from '@/lib/format'
import { cn } from '@/lib/utils'
import CommentMenu from './comment-menu'

type CommentProps = {
  comment: CommentRecord
}

export default function Comment({ comment }: CommentProps) {
  const authorUrl = useMemo(() => `/${comment.author.username}` as Route, [comment.author.username])

  const isContentRtl = useMemo(() => isRTL(comment.content), [comment.content])

  return (
    /* oxlint-disable prefer-tag-over-role */
    <Card role='button' className='group/comment'>
      <CardContent className='flex gap-3'>
        <UserTooltip user={comment.author}>
          <Link href={authorUrl} onClick={e => e.stopPropagation()}>
            <UserAvatar
              user={{
                image: comment.author.image,
                name: comment.author.name,
              }}
              className='size-8 transition hover:opacity-80'
            />
          </Link>
        </UserTooltip>

        <div className='w-full'>
          <div className='flex justify-between'>
            <PostHeader
              author={comment.author as OnboardedUser}
              authorUrl={authorUrl}
              createdAt={comment.createdAt}
            />

            <div className='min-w-0 flex-1'>
              <div className='mb-1 flex items-center justify-between gap-2'>
                <div className='flex-1' />
                <CommentMenu authorId={comment.authorId} commentId={comment.id} />
              </div>
            </div>
          </div>

          <p
            dir={isContentRtl ? 'rtl' : 'ltr'}
            className={cn(
              'mb-3 text-sm leading-relaxed wrap-break-word whitespace-pre-wrap',
              isContentRtl ? 'font-vazir text-right' : 'font-inter text-left',
            )}
          >
            {comment.content}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
