import { Route } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deletePost } from '@/actions/post.action';
import { QUERY_KEYS } from '@/lib/query-keys';
import { PostsPage } from '@/lib/types';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export function useDeletePost() {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  return useMutation({
    mutationFn: deletePost,

    async onMutate(postId) {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.feed });

      const cachedPost = queryClient.getQueryData<{
        author: { username: string };
      }>(QUERY_KEYS.post(postId));

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        { queryKey: QUERY_KEYS.feed },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              ...page,
              posts: page.posts.filter((p) => p.id !== postId),
            })),
          };
        },
      );

      return { cachedPost };
    },

    async onSuccess(deletedPost) {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.post(deletedPost.id) });

      const postPage = `/${deletedPost.author.username}/posts/${deletedPost.id}`;
      if (pathname === postPage) {
        router.push(`/${deletedPost.author.username}` as Route);
        toast.success('Post deleted. Redirecting...');
      } else {
        toast.success('Post deleted!');
      }
    },

    async onError(error, postId, context) {
      if (context?.cachedPost) {
        await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.feed });
      }

      console.error(error);
      toast.error('Failed to delete post. Try again.');
    },
  });
}
