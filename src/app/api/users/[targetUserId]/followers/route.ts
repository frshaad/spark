import { handleApiError } from '@/lib/errors';
import prisma from '@/lib/prisma';
import { requireOnboardedUserApi } from '@/lib/session';
import { UserFollowersSummary } from '@/lib/types';

export async function GET(
  _req: Request,
  ctx: RouteContext<'/api/users/[targetUserId]/followers'>,
) {
  try {
    const { targetUserId } = await ctx.params;
    const { user: authenticatedUser } = await requireOnboardedUserApi();

    const targetUserWithFollowerData = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: {
        followers: {
          where: { followerId: authenticatedUser.id },
          select: { followerId: true },
        },
        _count: {
          select: { followers: true },
        },
      },
    });
    if (!targetUserWithFollowerData) throw new Error('User Not Found');

    const followersSummary: UserFollowersSummary = {
      totalFollowers: targetUserWithFollowerData._count.followers,
      isFollowedByViewer: targetUserWithFollowerData.followers.length > 0,
    };

    return Response.json(followersSummary);
  } catch (error) {
    return handleApiError(error);
  }
}
