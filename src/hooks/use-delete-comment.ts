import { InfiniteData, QueryKey, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteComment } from '@/actions/comment.action'
import { QUERY_KEYS } from '@/lib/query-keys'
import { CursorPaginatedComments } from '@/lib/types'

export function useDeleteComment() {
  return useMutation({
    mutationFn: deleteComment,

    async onSuccess(deletedComment, _vars, _res, { client }) {
      const queryKey: QueryKey = QUERY_KEYS.comments(deletedComment.postId)

      await client.cancelQueries({ queryKey })

      client.setQueriesData<InfiniteData<CursorPaginatedComments, string | null>>(
        { queryKey },
        (oldData) => {
          if (!oldData) return

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              comments: page.comments.filter((comment) => comment.id !== deletedComment.id),
            })),
          }
        },
      )

      toast.success('Comment deleted!')
    },

    onError(error) {
      console.error(error)
      toast.error('Failed to delete comment. Please try again later!')
    },
  })
}
