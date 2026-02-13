import { toast } from 'sonner';
import { submitPost } from '@/actions/post.action';
import { QUERY_KEYS } from '@/lib/query-keys';
import { PostsPage } from '@/lib/types';
import { InfiniteData, QueryFilters, useMutation } from '@tanstack/react-query';

export function usePostSubmit() {
  return useMutation({
    mutationFn: submitPost,

    async onSuccess(newPost, _variables, _onMutateResult, context) {
      const queryFilter: QueryFilters = {
        queryKey: QUERY_KEYS.feed,
      };

      await context.client.cancelQueries(queryFilter);

      context.client.setQueriesData<InfiniteData<PostsPage, string | null>>(
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

      await context.client.invalidateQueries({
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
