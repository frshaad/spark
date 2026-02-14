export const QUERY_KEYS = {
  forYouFeed: ['feed', 'for-you'] as const,
  followingFeed: ['feed', 'following'] as const,

  userPosts: (userId: string) => ['feed', 'user-posts', userId] as const,
  post: (id: string) => ['post', id] as const,

  followerInfo: (userId: string) => ['follower-info', userId] as const,
};

/**
 * Helper to get all affected queries when a post changes
 */
export const getPostQueryFilters = (postId: string) => {
  return {
    feed: { queryKey: QUERY_KEYS.forYouFeed },
    post: { queryKey: QUERY_KEYS.post(postId) },
  };
};
