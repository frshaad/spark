import * as z from 'zod'

export const createPostSchema = z
  .object({
    content: z.string().optional(),
    mediaIds: z.array(z.string()).max(5, 'Cannot upload more than 5 media files').optional(),
  })
  .refine(
    data => {
      const hasContent = !!data.content?.trim()
      const hasMedia = !!data.mediaIds?.length

      return hasContent || hasMedia
    },
    { message: 'Post cannot be empty.', path: ['content'] },
  )

export type CreatePostInputs = z.infer<typeof createPostSchema>
