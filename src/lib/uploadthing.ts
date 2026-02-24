import { generateReactHelpers } from '@uploadthing/react'
import type { AppFileRouter } from '@/app/api/uploadthing/core'

export const { useUploadThing, createUpload } = generateReactHelpers<AppFileRouter>()
