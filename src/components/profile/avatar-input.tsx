'use client';

import { useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Camera } from 'lucide-react';
import CropImageDialog from './crop-image-dialog';

type AvatarInputProps = {
  src: string | StaticImageData;
  onImageCroppedAction: (blob: Blob | null) => void;
};

export default function AvatarInput({
  onImageCroppedAction,
  src,
}: AvatarInputProps) {
  const [imageToCrop, setImageToCrop] = useState<File>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  function onImageSelected(image: File | undefined) {
    if (!image) return;
  }

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onImageSelected(e.target.files?.[0])}
        ref={fileInputRef}
        className="sr-only hidden"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="group relative block cursor-pointer"
      >
        <Image
          src={src}
          alt={'Avatar preview'}
          width={150}
          height={150}
          className="size-32 flex-none rounded-full object-cover"
        />

        <span className="bg-opacity-10 group-hover:bg-opacity-25 absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full bg-black text-white transition-colors duration-200">
          <Camera size={24} />
        </span>
      </button>

      {imageToCrop && (
        <CropImageDialog
          src={URL.createObjectURL(imageToCrop)}
          cropAspectRatio={1}
          onCropped={onImageCroppedAction}
          onClose={() => {
            setImageToCrop(undefined);
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }}
        />
      )}
    </>
  );
}
