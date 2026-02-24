import { followTransaction, getFollowRelationship, unfollowTransaction } from '@/lib/dal/follow';
import { BadRequestError, NotFoundError, handleApiError } from '@/lib/errors';
import { requireAuthAPI } from '@/lib/session';
import { FollowInfo } from '@/lib/types';

type RouteCTX = RouteContext<'/api/users/[targetUserId]/follow'>;

export async function GET(_req: Request, ctx: RouteCTX) {
  try {
    const { targetUserId } = await ctx.params;
    const { user: authenticatedUser } = await requireAuthAPI();

    const targetUser = await getFollowRelationship(targetUserId, authenticatedUser.id);
    if (!targetUser) throw new NotFoundError('User not found');

    const followersSummary: FollowInfo = {
      followersCount: targetUser._count.followers,
      followingCount: targetUser._count.following,
      isFollowing: Boolean(targetUser.followers.length),
    };

    return Response.json(followersSummary);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(_req: Request, ctx: RouteCTX) {
  try {
    const { targetUserId } = await ctx.params;
    const { user: authenticatedUser } = await requireAuthAPI();

    if (authenticatedUser.id === targetUserId) throw new BadRequestError('Cannot follow yourself');

    await followTransaction({
      issuerId: authenticatedUser.id,
      recipientId: targetUserId,
    });

    return new Response();
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: Request, ctx: RouteCTX) {
  try {
    const { targetUserId } = await ctx.params;
    const { user: authenticatedUser } = await requireAuthAPI();

    if (authenticatedUser.id === targetUserId) throw new BadRequestError();

    await unfollowTransaction({
      issuerId: authenticatedUser.id,
      recipientId: targetUserId,
    });

    return new Response();
  } catch (error) {
    return handleApiError(error);
  }
}
