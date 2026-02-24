import { Attachment } from '@/lib/types'
import { cn } from '@/lib/utils'
import AttachmentPreview from './attachment-preview'

type AttachmentPreviewsProps = {
  attachments: Attachment[]
  removeAttachment: (fileName: string) => void
}

export default function AttachmentPreviews({
  attachments,
  removeAttachment,
}: AttachmentPreviewsProps) {
  return (
    <div className={cn('flex flex-col gap-3', attachments.length > 1 && 'sm:grid sm:grid-cols-2')}>
      {attachments.map((attachment) => (
        <AttachmentPreview
          key={attachment.file.name}
          attachment={attachment}
          onRemoveClick={() => removeAttachment(attachment.file.name)}
        />
      ))}
    </div>
  )
}
