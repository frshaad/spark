import { toast } from 'sonner';
import { submitPost } from '@/actions/post.action';
import { QUERY_KEYS } from '@/lib/query-keys';
import { CursorPaginatedPosts } from '@/lib/types';
import { InfiniteData, QueryFilters, useMutation } from '@tanstack/react-query';

export function usePostSubmit() {
  return useMutation({
    mutationFn: submitPost,

    async onSuccess(newPost, _variables, _onMutateResult, { client }) {
      const userId = newPost.author.id;

      const queryFilter = {
        queryKey: ['feed'],
        predicate(query) {
          return (
            query.queryKey.includes(QUERY_KEYS.forYouFeed[0]) ||
            (query.queryKey.includes(QUERY_KEYS.userPosts(userId)[0]) &&
              query.queryKey.includes(userId))
          );
        },
      } satisfies QueryFilters;

      await client.cancelQueries(queryFilter);

      client.setQueriesData<InfiniteData<CursorPaginatedPosts, string | null>>(
        queryFilter,
        (old) => prependPostToInfiniteCache(old, newPost),
      );

      await client.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return queryFilter.predicate(query) && !query.state.data;
        },
      });
    },

    onError(error) {
      console.error(error);
      toast.error('Failed to submit post');
    },
  });
}

function prependPostToInfiniteCache(
  oldData: InfiniteData<CursorPaginatedPosts, string | null> | undefined,
  newPost: CursorPaginatedPosts['posts'][number],
) {
  const firstPage = oldData?.pages[0];
  if (!firstPage) return oldData;

  return {
    pageParams: oldData.pageParams,
    pages: [
      {
        ...firstPage,
        posts: [newPost, ...firstPage.posts],
      },
      ...oldData.pages.slice(1),
    ],
  };
}
