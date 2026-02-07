import { toast } from 'sonner';
import { submitPost } from '@/actions/post.action';
import { QUERY_KEYS } from '@/lib/query-keys';
import { PostsPage } from '@/lib/types';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export function usePostSubmit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitPost,

    async onMutate(content) {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.feed });

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        { queryKey: QUERY_KEYS.feed },
        (oldData) => {
          if (!oldData?.pages[0]) return oldData;

          return {
            pageParams: oldData.pageParams,
            pages: [
              {
                ...oldData.pages[0],
                posts: [
                  {
                    id: `temp-${Date.now()}`,
                    content,
                    createdAt: new Date(),
                    authorId: '',
                    author: {
                      id: '',
                      username: '',
                      displayUsername: '',
                      image: null,
                      name: '',
                    },
                  },
                  ...oldData.pages[0].posts,
                ],
              },
              ...oldData.pages.slice(1),
            ],
          };
        },
      );

      return { optimisticPostId: `temp-${Date.now()}` };
    },

    async onSuccess(newPost) {
      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        { queryKey: QUERY_KEYS.feed },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              ...page,
              posts: page.posts.map((post) =>
                post.id.startsWith('temp-') ? newPost : post,
              ),
            })),
          };
        },
      );

      toast.success('Post published!');
    },
    onError(error, _variables, context) {
      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        { queryKey: QUERY_KEYS.feed },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              ...page,
              posts: page.posts.filter(
                (p) => p.id !== context?.optimisticPostId,
              ),
            })),
          };
        },
      );

      console.error(error);
      toast.error('Failed to publish post. Try again.');
    },
  });
}
