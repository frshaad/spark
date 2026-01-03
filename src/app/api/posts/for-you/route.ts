import { handleRouteError } from '@/lib/errors';
import prisma from '@/lib/prisma';
import { requireUserApi } from '@/lib/session';
import { postDataInclude } from '@/lib/types';

export async function GET() {
  try {
    await requireUserApi();

    const posts = await prisma.post.findMany({
      include: postDataInclude,
      orderBy: { createdAt: 'desc' },
    });

    return Response.json(posts);
  } catch (error) {
    handleRouteError(error);
  }
}
