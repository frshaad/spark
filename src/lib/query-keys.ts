export const QUERY_KEYS = {
  forYouFeed: ['for-you-feed'] as const,
  followingFeed: ['following-feed'] as const,
  userPosts: (username: string) => ['user-posts', username] as const,
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
