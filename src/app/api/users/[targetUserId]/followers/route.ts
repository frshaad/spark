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

    const targetUser = await prisma.user.findUniqueOrThrow({
      where: { id: targetUserId },
      select: {
        followers: {
          where: { followerId: authenticatedUser.id },
          select: { followerId: true },
          take: 1,
        },
        _count: {
          select: { followers: true },
        },
      },
    });

    const followersSummary: UserFollowersSummary = {
      totalFollowers: targetUser._count.followers,
      isFollowedByViewer: Boolean(targetUser.followers.length),
    };

    return Response.json(followersSummary);
  } catch (error) {
    return handleApiError(error);
  }
}
