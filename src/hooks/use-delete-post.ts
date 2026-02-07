import { Route } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deletePost } from '@/actions/post.action';
import { QUERY_KEYS } from '@/lib/query-keys';
import { PostsPage } from '@/lib/types';
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export function useDeletePost() {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  return useMutation({
    mutationFn: deletePost,

    async onSuccess(deletedPost) {
      const queryFilter: QueryFilters = { queryKey: QUERY_KEYS.feed };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
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

      if (
        pathname === `/${deletedPost.author.username}/posts/${deletedPost.id}`
      ) {
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
