import { NextRequest } from 'next/server';
import { handleRouteError } from '@/lib/errors';
import prisma from '@/lib/prisma';
import { requireUserApi } from '@/lib/session';
import { PostsPage, postDataInclude } from '@/lib/types';

export async function GET(req: NextRequest) {
  try {
    await requireUserApi();

    const cursor = req.nextUrl.searchParams.get('cursor') || undefined;
    const pageSize = 10;

    const posts = await prisma.post.findMany({
      include: postDataInclude,
      orderBy: { createdAt: 'desc' },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
    });

    const hasNextPage = posts.length > pageSize;
    const nextCursor = hasNextPage ? posts[pageSize].id : null;

    const data: PostsPage = { posts: posts.slice(0, pageSize), nextCursor };

    return Response.json(data);
  } catch (error) {
    return handleRouteError(error);
  }
}
