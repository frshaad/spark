import { NextRequest } from 'next/server';
import { handleApiError } from '@/lib/errors';
import prisma from '@/lib/prisma';
import { requireOnboardedUserApi } from '@/lib/session';
import { PostsPage, isOnboardedPost, postDataInclude } from '@/lib/types';

export async function GET(req: NextRequest) {
  try {
    await requireOnboardedUserApi();

    const cursor = req.nextUrl.searchParams.get('cursor') || undefined;
    const pageSize = 10;

    const posts = await prisma.post.findMany({
      include: postDataInclude,
      orderBy: { createdAt: 'desc' },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
    });

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
