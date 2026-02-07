export const QUERY_KEYS = {
  feed: ['feed'] as const,
  userPosts: (username: string) => ['user-posts', username] as const,
  post: (id: string) => ['post', id] as const,
};

/**
 * Helper to get all affected queries when a post changes
 */
export const getPostQueryFilters = (postId: string) => {
  return {
    feed: { queryKey: QUERY_KEYS.feed },
    post: { queryKey: QUERY_KEYS.post(postId) },
  };
};
