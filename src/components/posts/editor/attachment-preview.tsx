import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Attachment } from '@/lib/types';
import { cn } from '@/lib/utils';

type AttachmentPreviewProps = {
  attachment: Attachment;
  onRemoveClick: () => void;
};

export default function AttachmentPreview({
  attachment: { file, isUploading },
  onRemoveClick,
}: AttachmentPreviewProps) {
  const src = URL.createObjectURL(file);

  return (
    <div
      className={cn('relative mx-auto size-fit', isUploading && 'opacity-50')}
    >
      {file.type.startsWith('image') ? (
        <Image
          src={src}
          alt="Attachment preview"
          width={500}
          height={500}
          className="size-fit max-h-120 rounded-2xl"
        />
      ) : (
        <video controls className="size-fit max-h-120 rounded-2xl">
          <source src={src} type={file.type} />
        </video>
      )}
      {!isUploading && (
        <Button
          size="icon"
          variant="destructive"
          onClick={onRemoveClick}
          className="bg-foreground text-background hover:bg-foreground/60 absolute top-3 right-3 rounded-full p-1.5 transition-colors"
        >
          <X size={20} />
        </Button>
      )}
    </div>
  );
}
