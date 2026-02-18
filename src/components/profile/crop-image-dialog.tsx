'use client';

import { useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type CropImageDialogProps = {
  src: string;
  cropAspectRatio: number;
  onCroppedAction: (blob: Blob | null) => void;
  onCloseAction: () => void;
};

export default function CropImageDialog({
  src,
  cropAspectRatio,
  onCroppedAction,
  onCloseAction,
}: CropImageDialogProps) {
  const cropperRef = useRef<ReactCropperElement>(null);

  function onCrop() {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;
    cropper
      .getCroppedCanvas()
      .toBlob((blob) => onCroppedAction(blob), 'image/webp');
    onCloseAction();
  }

  return (
    <Dialog open onOpenChange={onCloseAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crop image</DialogTitle>
        </DialogHeader>
        <Cropper
          src={src}
          aspectRatio={cropAspectRatio}
          guides={false}
          zoomable={false}
          ref={cropperRef}
          className="mx-auto size-fit"
        />
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={onCloseAction}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button onClick={onCrop} className="flex-1">
            Crop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
