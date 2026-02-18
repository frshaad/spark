import { cache } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { OnboardedUser, Session, auth } from './auth';
import { ForbiddenError, UnauthorizedError } from './errors';

/**
 * Retrieves the current authenticated session using request headers.
 *
 * The result is memoized via React's `cache()` to prevent duplicate
 * session look-ups during a single server render/request life-cycle.
 *
 * @returns
 * A promise resolving to the session object if authenticated,
 * otherwise `null`.
 *
 * @remarks
 * - Safe to call multiple times in Server Components / Route Handlers.
 * - Uses Next.js `headers()` to forward request context to the auth API.
 */
export const getSession = cache(
  async (): Promise<Session | null> =>
    auth.api.getSession({ headers: await headers() }),
);

/**
 * Ensures the user is authenticated **and onboarded**.
 *
 * If no session exists, the user is redirected to `/login`.
 * If the user exists but has not completed onboarding
 * (missing `username`), they are redirected to `/add-username`.
 *
 * @returns
 * A fully authenticated and onboarded session.
 *
 * @throws {RedirectError}
 * Internally triggers Next.js navigation redirects.
 *
 * @remarks
 * - Intended for Server Components, layouts, and pages.
 * - Guarantees returned session has a valid `username`.
 * - Prevents rendering protected UI for incomplete users.
 */
export async function requireAuth() {
  const session = await getSession();

  if (!session) redirect('/login');
  if (!session.user.username) redirect('/add-username');

  return session as Session & { user: OnboardedUser };
}

/**
 * Ensures the request is authenticated **for API usage**.
 *
 * Unlike `requireAuth()`, this function does not redirect.
 * Instead, it throws structured domain errors suitable for
 * API responses.
 *
 * @returns
 * A validated session with an onboarded user.
 *
 * @throws {UnauthorizedError}
 * If the request has no valid session.
 *
 * @throws {ForbiddenError}
 * If the user exists but is not onboarded (no `username`).
 *
 * @remarks
 * - Intended for Route Handlers / server actions.
 * - Allows centralized error handling → HTTP 401 / 403 mapping.
 * - Guarantees downstream logic receives a valid user state.
 */
export async function requireAuthAPI() {
  const session = await getSession();

  if (!session) throw new UnauthorizedError();
  if (!session.user.username) throw new ForbiddenError();

  return session as Session & { user: OnboardedUser };
}
