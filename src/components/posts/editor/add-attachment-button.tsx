'use client';

import { Image } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';

type AddAttachmentsButtonProps = {
  action: (files: File[]) => void;
  disabled?: boolean;
};

export default function AddAttachmentsButton({
  action,
  disabled = false,
}: AddAttachmentsButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      action(files);
      e.target.value = '';
    }
  }

  return (
    <>
      <Button
        variant='ghost'
        size='icon-lg'
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        className='text-primary hover:text-primary rounded-full'
      >
        <Image size={24} />
      </Button>

      <input
        type='file'
        accept='image/*, video/*'
        ref={fileInputRef}
        multiple
        className='sr-only hidden'
        onChange={handleFileInputChange}
      />
    </>
  );
}
