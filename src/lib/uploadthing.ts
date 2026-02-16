import type { AppFileRouter } from '@/app/api/uploadthing/core';
import { generateReactHelpers } from '@uploadthing/react';

export const { useUploadThing, createUpload } =
  generateReactHelpers<AppFileRouter>();
