import { type FileRouter, createUploadthing } from 'uploadthing/next';
import { updateAvatar } from '@/lib/dal/user';
import { requireOnboardedUserApi } from '@/lib/session';

const f = createUploadthing();

export const appFileRouter = {
  avatar: f({
    image: {
      maxFileSize: '512KB',
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const { user } = await requireOnboardedUserApi();

      return { user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await updateAvatar(metadata.user.id, file.ufsUrl);

      return { avatarUrl: file.ufsUrl };
    }),
} satisfies FileRouter;

export type AppFileRouter = typeof appFileRouter;
