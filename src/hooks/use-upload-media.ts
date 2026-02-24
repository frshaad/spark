import { useState } from 'react'
import { toast } from 'sonner'
import { Attachment } from '@/lib/types'
import { useUploadThing } from '@/lib/uploadthing'

export function useUploadMedia() {
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [uploadProgress, setUploadProgress] = useState<number>()

  const { startUpload, isUploading } = useUploadThing('attachment', {
    onBeforeUploadBegin(files) {
      const renamedFiles = files.map(file => {
        const fileExtension = file.name.split('.').pop()
        return new File([file], `attachment_${crypto.randomUUID()}.${fileExtension}`, {
          type: file.type,
        })
      })

      setAttachments(prev => [...prev, ...renamedFiles.map(file => ({ file, isUploading: true }))])

      return renamedFiles
    },

    onUploadProgress: setUploadProgress,

    onClientUploadComplete(res) {
      setAttachments(prev =>
        prev.map(a => {
          const uploadResult = res.find(r => r.name === a.file.name)
          if (!uploadResult) return a

          return {
            ...a,
            mediaId: uploadResult.serverData.mediaId,
            isUploading: false,
          }
        }),
      )
    },

    onUploadError(error) {
      setAttachments(prev => prev.filter(a => !a.isUploading))
      toast.error(error.message)
    },
  })

  function handleStartUpload(files: File[]) {
    if (isUploading) {
      toast.info('Please wait for the current upload to complete.')
      return
    }

    if (attachments.length + files.length > 5) {
      toast.error('You can only upload up to 5 attachments per post.')
      return
    }

    void startUpload(files)
  }

  function removeAttachment(filename: string) {
    setAttachments(prev => prev.filter(a => a.file.name !== filename))
  }

  function reset() {
    setAttachments([])
    setUploadProgress(undefined)
  }

  return {
    startUpload: handleStartUpload,
    attachments,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset,
  }
}
