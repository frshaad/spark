export const QUERY_KEYS = {
  feed: ['feed', 'for-you'] as const,
  userPosts: (username: string) => ['posts', username] as const,
  post: (id: string) => ['post', id] as const,
};
