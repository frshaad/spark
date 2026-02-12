import { NextRequest } from 'next/server';
import { getFeedPostsPage } from '@/lib/dal/post';
import { handleApiError } from '@/lib/errors';
import { requireOnboardedUserApi } from '@/lib/session';
import { PostsPage, isOnboardedPost } from '@/lib/types';

export async function GET(req: NextRequest) {
  try {
    await requireOnboardedUserApi();

    const cursor = req.nextUrl.searchParams.get('cursor') || undefined;
    const pageSize = 10;

    const posts = await getFeedPostsPage(cursor, pageSize);

    // Filter out posts from users without username
    const validPosts = posts.filter(isOnboardedPost);

    const hasNextPage = validPosts.length > pageSize;
    const nextCursor = hasNextPage ? validPosts[pageSize].id : null;

    const data: PostsPage = {
      posts: validPosts.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    return handleApiError(error);
  }
}
