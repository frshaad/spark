import { toast } from 'sonner';
import { submitComment } from '@/actions/comment.action';
import { QUERY_KEYS } from '@/lib/query-keys';
import { CursorPaginatedComments } from '@/lib/types';
import { InfiniteData, QueryKey, useMutation } from '@tanstack/react-query';

export function useCommentSubmit() {
  return useMutation({
    mutationFn: submitComment,

    async onSuccess(newComment, _vars, _res, { client }) {
      const queryKey: QueryKey = QUERY_KEYS.comments(newComment.postId);

      await client.cancelQueries({ queryKey });

      client.setQueryData<InfiniteData<CursorPaginatedComments, string | null>>(
        queryKey,
        (oldData) => {
          const firstPage = oldData?.pages[0];
          if (!firstPage) return oldData;

          return {
            pageParams: oldData.pageParams,
            pages: [
              {
                ...firstPage,
                comments: [newComment, ...firstPage.comments],
              },
              ...oldData.pages.slice(1),
            ],
          };
        },
      );

      await client.invalidateQueries({
        queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });
    },

    onError(error) {
      console.error(error);
      toast.error('Failed to submit comment');
    },
  });
}
