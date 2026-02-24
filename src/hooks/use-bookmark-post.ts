import { QueryKey, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '@/lib/ky'
import { QUERY_KEYS } from '@/lib/query-keys'
import { BookmarkInfo } from '@/lib/types'

type BookmarkVariables = {
  postId: string
  isBookmarked: boolean
}

export function useBookmarkPost() {
  return useMutation({
    mutationFn: ({ postId, isBookmarked }: BookmarkVariables) =>
      isBookmarked ? api.delete(`posts/${postId}/bookmark`) : api.post(`posts/${postId}/bookmark`),

    async onMutate({ postId }, ctx) {
      const queryKey: QueryKey = QUERY_KEYS.bookmarkInfo(postId)

      await ctx.client.cancelQueries({ queryKey })

      const previousData = ctx.client.getQueryData<BookmarkInfo>(queryKey)

      ctx.client.setQueryData<BookmarkInfo>(queryKey, () => ({
        isBookmarked: !previousData?.isBookmarked,
      }))

      return previousData
    },

    onError(error, { postId }, previousData, ctx) {
      const queryKey: QueryKey = QUERY_KEYS.bookmarkInfo(postId)
      ctx.client.setQueryData<BookmarkInfo>(queryKey, previousData)
      console.error(error)
      toast.error('Something went wrong. Please try again.')
    },

    async onSettled(_d, _e, { postId }, _o, ctx) {
      const queryKey: QueryKey = QUERY_KEYS.bookmarkInfo(postId)
      await ctx.client.invalidateQueries({ queryKey })
    },
  })
}
