import {
  createLikePostTransaction,
  removeLikePostTransaction,
} from '@/lib/dal/like';
import { findPostById } from '@/lib/dal/post';
import { NotFoundError, handleApiError } from '@/lib/errors';
import { requireAuthAPI } from '@/lib/session';
import { LikeInfo } from '@/lib/types';

type RouteCtx = RouteContext<'/api/posts/[postId]/likes'>;

export async function GET(_req: Request, ctx: RouteCtx) {
  try {
    const { postId } = await ctx.params;
    const { user: authenticatedUser } = await requireAuthAPI();

    const post = await findPostById(postId, {
      likes: {
        where: { userId: authenticatedUser.id },
        select: { userId: true },
      },
      _count: { select: { likes: true } },
    });

    if (!post) throw new NotFoundError('Post not found');

    const likesSummary: LikeInfo = {
      likesCount: post._count.likes,
      isLiked: post.likes.length > 0,
    };

    return Response.json(likesSummary);
  } catch (error) {
    handleApiError(error);
  }
}

export async function POST(_req: Request, ctx: RouteCtx) {
  try {
    const { postId } = await ctx.params;
    const { user: authenticatedUser } = await requireAuthAPI();

    const post = await findPostById(postId, { authorId: true });
    if (!post) {
      throw new NotFoundError('Post not found');
    }

    await createLikePostTransaction({
      issuerId: authenticatedUser.id,
      recipientId: post.authorId,
      postId,
    });

    return new Response();
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: Request, ctx: RouteCtx) {
  try {
    const { postId } = await ctx.params;
    const { user: authenticatedUser } = await requireAuthAPI();

    const post = await findPostById(postId, { authorId: true });
    if (!post) {
      throw new NotFoundError('Post not found');
    }

    await removeLikePostTransaction({
      issuerId: authenticatedUser.id,
      recipientId: post.authorId,
      postId,
    });

    return new Response();
  } catch (error) {
    return handleApiError(error);
  }
}
