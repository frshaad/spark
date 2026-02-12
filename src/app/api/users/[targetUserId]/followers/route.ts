import { getUserFollowersSummary } from '@/lib/dal/follow';
import { handleApiError } from '@/lib/errors';
import { requireOnboardedUserApi } from '@/lib/session';
import { UserFollowersSummary } from '@/lib/types';

export async function GET(
  _req: Request,
  ctx: RouteContext<'/api/users/[targetUserId]/followers'>,
) {
  try {
    const { targetUserId } = await ctx.params;
    const { user: authenticatedUser } = await requireOnboardedUserApi();

    const targetUser = await getUserFollowersSummary(
      targetUserId,
      authenticatedUser.id,
    );

    const followersSummary: UserFollowersSummary = {
      totalFollowers: targetUser._count.followers,
      isFollowedByViewer: Boolean(targetUser.followers.length),
    };

    return Response.json(followersSummary);
  } catch (error) {
    return handleApiError(error);
  }
}
