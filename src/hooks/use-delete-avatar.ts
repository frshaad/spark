import type { InfiniteData, QueryFilters } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { CursorPaginatedPosts } from '@/lib/types'
import { api } from '@/lib/ky'
import { QUERY_KEYS } from '@/lib/query-keys'

export function useDeleteAvatar(userId: string) {
  return useMutation({
    mutationFn: () => api.delete('users/avatar'),

    async onMutate(_, { client }) {
      const feedsToUpdate: QueryFilters[] = [
        { queryKey: QUERY_KEYS.forYouFeed },
        { queryKey: QUERY_KEYS.followingFeed },
        { queryKey: QUERY_KEYS.userPosts(userId) },
      ]

      // Cancel active feed fetches
      await Promise.all(feedsToUpdate.map(filter => client.cancelQueries(filter)))

      const previousData = feedsToUpdate.map(filter => ({
        filter,
        data: client.getQueriesData(filter),
      }))

      // Optimistic avatar removal
      feedsToUpdate.forEach(filter => {
        client.setQueriesData<InfiniteData<CursorPaginatedPosts>>(filter, old =>
          updatePostsAvatar(old, userId),
        )
      })

      return { previousData }
    },

    onError(error, _, onMutateResult, { client }) {
      onMutateResult?.previousData.forEach(({ filter, data }) => {
        client.setQueriesData(filter, data)
      })

      console.error(error)
      toast.error('Failed to remove profile photo')
    },
  })
}

function updatePostsAvatar(
  oldData: InfiniteData<CursorPaginatedPosts> | undefined,
  userId: string,
) {
  if (!oldData) return oldData

  return {
    pageParams: oldData.pageParams,
    pages: oldData.pages.map(page => ({
      ...page,
      posts: page.posts.map(post =>
        post.authorId === userId
          ? {
              ...post,
              author: {
                ...post.author,
                image: null,
              },
            }
          : post,
      ),
    })),
  }
}
