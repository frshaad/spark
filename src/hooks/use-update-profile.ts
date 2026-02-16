import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { updateUserProfileData } from '@/actions/user.action';
import { CursorPaginatedPosts } from '@/lib/types';
import { useUploadThing } from '@/lib/uploadthing';
import { UpdateUserProfileValues } from '@/lib/validation/user';
import { InfiniteData, QueryFilters, useMutation } from '@tanstack/react-query';

type UpdateUserProfileVariables = {
  values: UpdateUserProfileValues;
  avatar?: File;
};

export function useUpdateProfile() {
  const router = useRouter();
  const { startUpload: startAvatarUpload } = useUploadThing('avatar');

  return useMutation({
    mutationFn: ({ values, avatar }: UpdateUserProfileVariables) =>
      Promise.all([
        updateUserProfileData(values),
        avatar && startAvatarUpload([avatar]),
      ]),

    async onSuccess(
      [updatedUser, uploadResult],
      _variables,
      _onMutateResult,
      ctx,
    ) {
      const newAvatarUrl = uploadResult?.[0].serverData.avatarUrl;

      const queryFilter: QueryFilters = { queryKey: ['feed'] };

      await ctx.client.invalidateQueries(queryFilter);

      ctx.client.setQueriesData<
        InfiniteData<CursorPaginatedPosts, string | null>
      >(queryFilter, (oldData) => {
        if (!oldData) return;

        return {
          pageParams: oldData.pageParams,
          pages: oldData.pages.map((page) => ({
            nextCursor: page.nextCursor,
            posts: page.posts.map((post) => {
              if (post.author.id === updatedUser.id) {
                return {
                  ...post,
                  author: {
                    ...post.author,
                    image: newAvatarUrl || updatedUser.image,
                  },
                };
              } else {
                return post;
              }
            }),
          })),
        };
      });

      router.refresh();
      toast.success('Profile updated successfully');
    },

    onError(error) {
      console.error(error);
      toast.error('Failed to update profile data');
    },
  });
}
