import { deleteUserAvatar, findUser } from '@/lib/dal/user'
import { BadRequestError, handleApiError, NotFoundError } from '@/lib/errors'
import { requireAuthAPI } from '@/lib/session'

export async function DELETE() {
  try {
    const { user: authenticatedUser } = await requireAuthAPI()

    const user = await findUser(authenticatedUser.id)

    if (!user) {
      throw new NotFoundError()
    }
    if (!user.image) {
      throw new BadRequestError('There is no profile image to remove')
    }

    await deleteUserAvatar(user.id)

    return new Response()
  } catch (error) {
    return handleApiError(error)
  }
}
