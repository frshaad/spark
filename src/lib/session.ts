import { cache } from 'react';
import { headers } from 'next/headers';
import { unauthorized } from 'next/navigation';
import { auth } from './auth';
import { HttpError } from './errors';

const fetchSession = async () => {
  return auth.api.getSession({ headers: await headers() });
};

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
  const session = await fetchSession();
  if (!session) unauthorized();
  return session;
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
