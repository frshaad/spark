import {
  followUser,
  getUserFollowersSummary,
  unfollowUser,
} from '@/lib/dal/follow';
import { BadRequestError, NotFoundError, handleApiError } from '@/lib/errors';
import { requireOnboardedUserApi } from '@/lib/session';
import { UserFollowersSummary } from '@/lib/types';

type RouteCTX = RouteContext<'/api/users/[targetUserId]/follow'>;

export async function GET(_req: Request, ctx: RouteCTX) {
  try {
    const { targetUserId } = await ctx.params;
    const { user: authenticatedUser } = await requireOnboardedUserApi();

    const targetUser = await getUserFollowersSummary(
      targetUserId,
      authenticatedUser.id,
    );
    if (!targetUser) throw new NotFoundError('User not found');

    const followersSummary: UserFollowersSummary = {
      totalFollowers: targetUser._count.followers,
      isFollowedByViewer: Boolean(targetUser.followers.length),
    };

    return Response.json(followersSummary);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(_req: Request, ctx: RouteCTX) {
  try {
    const { targetUserId } = await ctx.params;
    const { user: authenticatedUser } = await requireOnboardedUserApi();

    if (authenticatedUser.id === targetUserId)
      throw new BadRequestError('Cannot follow yourself');

    await followUser(targetUserId, authenticatedUser.id);

    return new Response();
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: Request, ctx: RouteCTX) {
  try {
    const { targetUserId } = await ctx.params;
    const { user: authenticatedUser } = await requireOnboardedUserApi();

    if (authenticatedUser.id === targetUserId) throw new BadRequestError();

    await unfollowUser(targetUserId, authenticatedUser.id);

    return new Response();
  } catch (error) {
    return handleApiError(error);
  }
}
