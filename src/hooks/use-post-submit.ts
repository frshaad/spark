import { toast } from 'sonner';
import { submitPost } from '@/actions/post.action';
import { QUERY_KEYS } from '@/lib/query-keys';
import { PostsPage } from '@/lib/types';
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export function usePostSubmit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitPost,

    async onSuccess(newPost) {
      const queryFilter: QueryFilters = {
        queryKey: QUERY_KEYS.feed,
      };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];
          if (!firstPage) return oldData;
          return {
            pageParams: oldData.pageParams,
            pages: [
              {
                posts: [newPost, ...firstPage.posts],
                nextCursor: firstPage.nextCursor,
              },
              ...oldData.pages.slice(1),
            ],
          };
        },
      );

      await queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate: (query) => !query.state.data,
      });

      toast.success('Post published!');
    },

    onError(error) {
      console.error(error);
      toast.error('Failed to submit post');
    },
  });
}
