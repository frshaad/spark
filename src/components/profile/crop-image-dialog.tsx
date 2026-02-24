'use client';

import { useCallback, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getCroppedImg } from '@/lib/image-helper';

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
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  async function onCrop() {
    try {
      if (!croppedAreaPixels) return;

      const blob = await getCroppedImg(src, croppedAreaPixels);
      onCroppedAction(blob);
      onCloseAction();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Dialog open onOpenChange={onCloseAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crop image</DialogTitle>
        </DialogHeader>

        <div className='bg-secondary relative h-75 w-full'>
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={cropAspectRatio}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>

        <DialogFooter>
          <Button variant='secondary' onClick={onCloseAction} className='flex-1'>
            Cancel
          </Button>
          <Button onClick={onCrop} className='flex-1'>
            Crop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
