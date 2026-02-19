import * as z from 'zod';

export const createPostSchema = z.object({
  content: z.string().min(1, 'Content is required.'),
  mediaIds: z
    .array(z.string())
    .max(5, 'Cannot upload more than 5 media files')
    .optional(),
});

export type CreatePostInputs = z.infer<typeof createPostSchema>;
