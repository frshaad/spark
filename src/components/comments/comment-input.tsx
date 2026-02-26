'use client'

import { LoaderCircle, SendHorizonalIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCommentSubmit } from '@/hooks/use-comment-submit'
import { isRTL } from '@/lib/format'
import { PostView } from '@/lib/types'

type CommentInputProps = {
  post: PostView
}

export default function CommentInput({ post }: CommentInputProps) {
  const [content, setContent] = useState('')

  const { mutate, isPending } = useCommentSubmit()

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (content.length === 0) return
    mutate({ content, post }, { onSuccess: () => setContent('') })
  }

  const isContentRtl = useMemo(() => isRTL(content), [content])

  return (
    <form className='w-full space-y-2' onSubmit={onSubmit}>
      <div className='relative'>
        <Input
          type='text'
          placeholder='Write a comment...'
          className='pr-9'
          dir={isContentRtl ? 'rtl' : 'ltr'}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <Button
          type='submit'
          variant='ghost'
          size='icon'
          disabled={!content.trim() || isPending}
          className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
        >
          {isPending ? (
            <>
              <LoaderCircle className='animate-spin' />
              <span className='sr-only'>Sending</span>
            </>
          ) : (
            <>
              <SendHorizonalIcon />
              <span className='sr-only'>Send</span>
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
