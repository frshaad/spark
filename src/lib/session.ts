import { cache } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { OnboardedUser, Session, auth } from './auth';
import { HttpError } from './errors';

async function fetchSession(): Promise<Session | null> {
  return auth.api.getSession({ headers: await headers() });
}

/**
 * Returns the current session without enforcing auth.
 * Cached per-request.
 */
export const getServerSession = cache(async () => fetchSession());

/**
 * Ensures a valid logged-in session exists.
 * Redirects with 401 if missing.
 */
export const requireUser = cache(async () => {
  const session = await getServerSession();
  if (!session) redirect('/login');
  return session;
});

/**
 * For server pages/layouts: redirect to onboarding if username missing.
 * Returns a session typed with an OnboardedUser.
 */
export const requireOnboardedUser = cache(async () => {
  const session = await getServerSession();
  if (!session) redirect('/login');
  if (!session.user.username) redirect('/add-username');

  return session as Session & { user: OnboardedUser };
});

/**
 * Ensures a valid logged-in session exists.
 * Redirects with 401 if missing.
 */
export async function requireUserApi() {
  const session = await fetchSession();
  if (!session) {
    throw new HttpError(401, 'Unauthorized');
  }
  return session;
}

// For API route handlers (no redirect — you must return proper status)
export async function requireOnboardedUserApi() {
  const session = await fetchSession();
  if (!session) throw new HttpError(401, 'Unauthorized');
  if (!session.user.username) throw new HttpError(403, 'Username required');
  return session as Session & { user: OnboardedUser };
}
