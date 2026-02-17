import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { updateUserProfileData } from '@/actions/user.action';
import { QUERY_KEYS } from '@/lib/query-keys';
import { CursorPaginatedPosts, UserRecord } from '@/lib/types';
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

      const feedsToUpdate: QueryFilters[] = [
        { queryKey: QUERY_KEYS.forYouFeed },
        { queryKey: QUERY_KEYS.followingFeed },
        { queryKey: QUERY_KEYS.userPosts(updatedUser.id) },
      ];

      feedsToUpdate.forEach((filter) => {
        ctx.client.setQueriesData<
          InfiniteData<CursorPaginatedPosts, string | null>
        >(filter, (oldData) =>
          updatePostsAuthor(oldData, updatedUser, newAvatarUrl),
        );
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

function updatePostsAuthor(
  oldData: InfiniteData<CursorPaginatedPosts, string | null> | undefined,
  updatedUser: UserRecord,
  newAvatarUrl?: string,
) {
  if (!oldData) return oldData;

  return {
    pageParams: oldData.pageParams,
    pages: oldData.pages.map((page) => ({
      ...page,
      posts: page.posts.map((post) =>
        post.authorId === updatedUser.id
          ? {
              ...post,
              author: {
                ...post.author,
                image: newAvatarUrl ?? updatedUser.image,
                name: updatedUser.name,
                displayUsername: updatedUser.name,
                bio: updatedUser.bio,
              },
            }
          : post,
      ),
    })),
  };
}
