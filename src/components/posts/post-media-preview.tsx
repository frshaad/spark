import Image from 'next/image'
import type { Media } from '@/generated/prisma/browser'

export default function PostMediaPreview({ media }: { media: Media }) {
  if (media.type === 'IMAGE') {
    return (
      <Image
        src={media.url}
        alt='Attachment'
        width={500}
        height={500}
        className='pointer-events-auto mx-auto size-fit max-h-120 rounded-2xl'
      />
    )
  }

  if (media.type === 'VIDEO') {
    return (
      <div className='pointer-events-auto'>
        {/* oxlint-disable */}
        <video src={media.url} controls className='mx-auto size-fit max-h-120 rounded-2xl' />
      </div>
    )
  }

  return <p className='text-destructive'>Unsupported media type</p>
}
