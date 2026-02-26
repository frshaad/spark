'use client'

import './tiptap.css'
import { EditorContent } from '@tiptap/react'
import { useDropzone } from '@uploadthing/react'
import { useCallback, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import UserAvatar from '@/components/user-avatar'
import { usePostEditor } from '@/hooks/use-post-editor'
import { usePostSubmit } from '@/hooks/use-post-submit'
import { useUploadMedia } from '@/hooks/use-upload-media'
import { isRTL } from '@/lib/format'
import { cn } from '@/lib/utils'
import AttachmentPreviews from './attachment-previews'
import PostEditorActions from './post-editor-actions'

type PostEditorProps = {
  user: {
    name: string
    image: string | null
  }
}

export default function PostEditor({ user }: PostEditorProps) {
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

  function handleSubmit() {
    if (isPostEmpty) return
    mutate(
      { content, mediaIds: attachments.map(a => a.mediaId).filter(Boolean) as string[] },
      {
        onSuccess() {
          clearText()
          resetMediaUpload()
        },
      },
    )
  }

  const onPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      const files = Array.from(e.clipboardData.items)
        .filter(i => i.kind === 'file')
        .map(i => i.getAsFile()) as File[]

      if (files.length) startUpload(files)
    },
    [startUpload],
  )

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
        {attachments.length > 0 && (
          <AttachmentPreviews attachments={attachments} removeAttachment={removeAttachment} />
        )}
      </CardContent>

      <PostEditorActions
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        attachmentsCount={attachments.length}
        isPending={isPending}
        isPostEmpty={isPostEmpty}
        onSubmit={handleSubmit}
        onAddAttachment={startUpload}
      />
    </Card>
  )
}
