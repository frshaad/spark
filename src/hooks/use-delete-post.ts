import { InfiniteData, QueryFilters, useMutation } from '@tanstack/react-query';
import { Route } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deletePost } from '@/actions/post.action';
import { QUERY_KEYS } from '@/lib/query-keys';
import { CursorPaginatedPosts } from '@/lib/types';

export function useDeletePost() {
  const pathname = usePathname();
  const router = useRouter();

  return useMutation({
    mutationFn: deletePost,

    async onSuccess(deletedPost, _variables, _onMutateResult, context) {
      const queryFilter: QueryFilters = { queryKey: QUERY_KEYS.forYouFeed };

      await context.client.cancelQueries(queryFilter);

      context.client.setQueriesData<InfiniteData<CursorPaginatedPosts, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.filter((post) => post.id !== deletedPost.id),
            })),
          };
        },
      );

      if (pathname === `/${deletedPost.author.username}/${deletedPost.id}`) {
        router.push(`/${deletedPost.author.username}` as Route);
      }

      toast.success('Post deleted!');
    },

    onError(error) {
      console.error(error);
      toast.error('Failed to delete post. Please try again later!');
    },
  });
}
