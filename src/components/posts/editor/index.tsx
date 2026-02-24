'use client'

import './tiptap.css'
import { EditorContent } from '@tiptap/react'
import { useDropzone } from '@uploadthing/react'
import { Loader2 } from 'lucide-react'
import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import UserAvatar from '@/components/user-avatar'
import { usePostEditor } from '@/hooks/use-post-editor'
import { usePostSubmit } from '@/hooks/use-post-submit'
import { useUploadMedia } from '@/hooks/use-upload-media'
import { isRTL } from '@/lib/format'
import { cn } from '@/lib/utils'
import AddAttachmentsButton from './add-attachment-button'
import AttachmentPreviews from './attachment-previews'

type Props = {
  user: {
    name: string
    image: string | null
  }
}

export default function PostEditor({ user }: Props) {
  const { editor, content, clear: clearText } = usePostEditor()
  const { mutate, isPending } = usePostSubmit()
  const {
    attachments,
    isUploading,
    removeAttachment,
    startUpload,
    uploadProgress,
    reset: resetMediaUpload,
  } = useUploadMedia()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: startUpload,
  })

  const { onClick: _, ...rootProps } = getRootProps()

  const isPostEmpty = content.trim().length === 0 && attachments.length === 0
  const isContentRtl = useMemo(() => isRTL(content), [content])

  function submit() {
    if (isPostEmpty) return
    mutate(
      {
        content,
        mediaIds: attachments.map(a => a.mediaId).filter(Boolean) as string[],
      },
      {
        onSuccess() {
          clearText()
          resetMediaUpload()
        },
      },
    )
  }

  function onPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const files = Array.from(e.clipboardData.items)
      .filter(item => item.kind === 'file')
      .map(item => item.getAsFile()) as File[]

    if (!files.length) return

    startUpload(files)
  }

  return (
    <Card>
      <CardContent className='flex flex-col gap-5'>
        <div className='flex gap-3'>
          <UserAvatar user={user} className='size-10 shrink-0' />
          <div className='flex-1 pt-1' {...rootProps}>
            <EditorContent
              editor={editor}
              className={cn('w-full', isDragActive && 'rounded-lg outline-dashed')}
              dir={isContentRtl ? 'rtl' : 'ltr'}
              onPaste={onPaste}
            />
            <input {...getInputProps()} />
          </div>
        </div>
        {!!attachments.length && (
          <AttachmentPreviews attachments={attachments} removeAttachment={removeAttachment} />
        )}
      </CardContent>

      <CardFooter className='justify-end gap-2'>
        {isUploading && (
          <>
            <span className='text-primary text-sm'>{uploadProgress ?? 0}%</span>
            <Loader2 className='text-primary size-5 animate-spin' />
          </>
        )}
        <AddAttachmentsButton
          action={startUpload}
          disabled={isUploading || attachments.length >= 5}
        />
        <Button
          onClick={submit}
          disabled={isPostEmpty || isPending || isUploading || attachments.length >= 5}
          size='lg'
          className='rounded-full px-10'
        >
          {isPending ? 'Posting...' : 'Post'}
        </Button>
      </CardFooter>
    </Card>
  )
}
