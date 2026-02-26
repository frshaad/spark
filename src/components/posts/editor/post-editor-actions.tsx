import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import AddAttachmentsButton from './add-attachment-button'

export default function PostEditorActions({
  isUploading,
  uploadProgress,
  attachmentsCount,
  isPending,
  isPostEmpty,
  onSubmit,
  onAddAttachment,
}: {
  isUploading: boolean
  uploadProgress: number | undefined
  attachmentsCount: number
  isPending: boolean
  isPostEmpty: boolean
  onSubmit: () => void
  onAddAttachment: (files: File[]) => void
}) {
  const isTooManyAttachments = attachmentsCount >= 5
  const canSubmit = !isPostEmpty && !isPending && !isUploading && !isTooManyAttachments

  return (
    <CardFooter className='justify-end gap-2'>
      {isUploading && (
        <>
          <span className='text-primary text-sm'>{uploadProgress ?? 0}%</span>
          <Loader2 className='text-primary size-5 animate-spin' />
        </>
      )}
      <AddAttachmentsButton
        action={onAddAttachment}
        disabled={isUploading || isTooManyAttachments}
      />
      <Button onClick={onSubmit} disabled={!canSubmit} size='lg' className='rounded-full px-10'>
        {isPending ? 'Posting...' : 'Post'}
      </Button>
    </CardFooter>
  )
}
