import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import type { OnboardedUser, Session } from './auth'
import { auth } from './auth'
import { ForbiddenError, UnauthorizedError } from './errors'

export const getSession = cache(
  async (): Promise<Session | null> => auth.api.getSession({ headers: await headers() }),
)

export async function requireAuth() {
  const session = await getSession()

  if (!session) redirect('/login')
  if (!session.user.username) redirect('/add-username')

  return session as Session & { user: OnboardedUser }
}

export async function requireAuthAPI() {
  const session = await getSession()

  if (!session) throw new UnauthorizedError()
  if (!session.user.username) throw new ForbiddenError()

  return session as Session & { user: OnboardedUser }
}
