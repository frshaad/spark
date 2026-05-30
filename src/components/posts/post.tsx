'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import type { PostView } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import UserAvatar from '@/components/user-avatar'
import UserTooltip from '@/components/user-tooltip'
import PostActions from './post-actions'
import PostContent from './post-content'
import PostHeader from './post-header'
import PostMediaPreviews from './post-media-previews'
import PostMenu from './post-menu'

export default function Post({ post }: { post: PostView }) {
  const router = useRouter()

  const postUrl = useMemo(
    () => `/${post.author.username}/${post.id}` as Route,
    [post.id, post.author.username],
  )
  const authorUrl = useMemo(() => `/${post.author.username}` as Route, [post.author.username])

  const navigateToPost = useCallback(() => {
    router.push(postUrl)
  }, [router, postUrl])

  const handleCardClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      const selection = window.getSelection()
      if (selection && selection.toString().length > 0) return
    }
    navigateToPost()
  }, [navigateToPost])

  return (
    <Card className='group/post'>
      <CardContent className='flex gap-3'>
        <UserTooltip user={post.author}>
          <Link href={authorUrl} onClick={e => e.stopPropagation()}>
            <UserAvatar
              user={{
                image: post.author.image,
                name: post.author.name,
              }}
              className='size-10 transition hover:opacity-80'
            />
          </Link>
        </UserTooltip>

        {/* oxlint-disable click-events-have-key-events, no-static-element-interactions */}
        <div
          className='w-full cursor-pointer space-y-1'
          onClick={handleCardClick}
          aria-label={`Open post by ${post.author.name}`}
        >
          <div className='flex items-center justify-between'>
            <PostHeader author={post.author} authorUrl={authorUrl} createdAt={post.createdAt} />

            <div className='min-w-0 flex-1'>
              <div className='mb-1 flex items-center justify-between gap-2'>
                <div className='flex-1' />
                <PostMenu authorId={post.authorId} postId={post.id} />
              </div>
            </div>
          </div>

          <div>
            <PostContent content={post.content} />
            {!!post.attachments.length && <PostMediaPreviews attachments={post.attachments} />}
          </div>

          <PostActions post={post} />
        </div>
      </CardContent>
    </Card>
  )
}
