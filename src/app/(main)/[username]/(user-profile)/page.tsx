import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProfileHeader from '@/components/profile/profile-header'
import UserProfileFeed from '@/components/profile/user-feed'
import { Separator } from '@/components/ui/separator'
import { getUserByUsername } from '@/lib/dal/user'
import { requireAuth } from '@/lib/session'

export default async function UserProfile({ params }: PageProps<'/[username]'>) {
  const { user: authenticatedUser } = await requireAuth()
  const { username } = await params

  const user = await getUserByUsername(username, authenticatedUser.id)
  if (!user) notFound()

  return (
    <>
      <ProfileHeader user={user} authenticatedUserId={authenticatedUser.id} />
      <Separator />
      <UserProfileFeed userId={user.id} />
    </>
  )
}

export async function generateMetadata({ params }: PageProps<'/[username]'>): Promise<Metadata> {
  const { user: authenticatedUser } = await requireAuth()
  const { username } = await params

  const user = await getUserByUsername(username, authenticatedUser.id)
  if (!user) notFound()

  return {
    title: `${user.name} (@${user.username})`,
  }
}
