import { authClient } from '@/lib/auth-client'

export function useAuth() {
  const { data: session, isPending, error, refetch } = authClient.useSession()

  const isAuthenticated = !!session?.user
  const user = session?.user || null

  return {
    user,
    session,
    isAuthenticated,
    isPending,
    error,
    refetch,
  }
}
