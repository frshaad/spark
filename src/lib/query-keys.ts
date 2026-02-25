export const QUERY_KEYS = {
  forYouFeed: ['feed', 'for-you'] as const,
  followingFeed: ['feed', 'following'] as const,
  bookmarksFeed: ['feed', 'bookmarks'] as const,
  notifications: ['notifications'] as const,

  post: (id: string) => ['post', id] as const,
  comments: (postId: string) => ['comments', postId] as const,
  user: (username: string) => ['user', username] as const,
  userPosts: (userId: string) => ['feed', 'user-posts', userId] as const,

  followerInfo: (userId: string) => ['follower-info', userId] as const,
  likeInfo: (postId: string) => ['like-info', postId] as const,
  bookmarkInfo: (postId: string) => ['bookmark-info', postId] as const,

  unreadNotificationCount: ['unread-notification-count'] as const,
}

/**
 * Helper to get all affected queries when a post changes
 */
export const getPostQueryFilters = (postId: string) => {
  return {
    feed: { queryKey: QUERY_KEYS.forYouFeed },
    post: { queryKey: QUERY_KEYS.post(postId) },
  }
}
