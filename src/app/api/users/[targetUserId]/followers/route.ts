import { NextResponse } from 'next/server';
import { isAsyncFunction } from 'node:util/types';
import {
  followUser,
  getUserFollowersSummary,
  unfollowUser,
} from '@/lib/dal/follow';
import { BadRequestError, NotFoundError, handleApiError } from '@/lib/errors';
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

export async function POST(
  request: Request,
  ctx: RouteContext<'/api/users/[targetUserId]/followers'>,
) {
  try {
    const { targetUserId } = await ctx.params;
    const { user: authenticatedUser } = await requireOnboardedUserApi();

    if (authenticatedUser.id === targetUserId)
      throw new BadRequestError('Cannot follow yourself');

    await followUser(targetUserId, authenticatedUser.id);

    return new NextResponse();
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  req: Request,
  ctx: RouteContext<'/api/users/[targetUserId]/followers'>,
) {
  try {
    const { targetUserId } = await ctx.params;
    const { user: authenticatedUser } = await requireOnboardedUserApi();

    if (authenticatedUser.id === targetUserId) throw new BadRequestError();

    await unfollowUser(targetUserId, authenticatedUser.id);

    return new NextResponse();
  } catch (error) {
    return handleApiError(error);
  }
}
