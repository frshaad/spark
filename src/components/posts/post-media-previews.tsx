import { Media } from '@/generated/prisma/browser';
import { cn } from '@/lib/utils';
import PostMediaPreview from './post-media-preview';

export default function PostMediaPreviews({ attachments }: { attachments: Media[] }) {
  return (
    <div className={cn('flex flex-col gap-3', attachments.length > 1 && 'sm:grid sm:grid-cols-2')}>
      {attachments.map((m) => (
        <PostMediaPreview key={m.id} media={m} />
      ))}
    </div>
  );
}
