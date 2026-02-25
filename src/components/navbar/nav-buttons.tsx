import { getNotificationUnreadCount } from '@/lib/dal/notification'
import { requireAuth } from '@/lib/session'
import NavButton from './nav-button'
import { NAV_LINKS } from './navbar.constants'
import NotificationNavButton from './notification-nav-button'

export default async function NavButtons() {
  const { user } = await requireAuth()

  const unreadNotificationsCount = await getNotificationUnreadCount(user.id)

  return (
    <>
      <NavButton {...NAV_LINKS.home} />
      <NotificationNavButton
        initialState={{
          unreadCount: unreadNotificationsCount,
        }}
      />
      <NavButton {...NAV_LINKS.messages} />
      <NavButton {...NAV_LINKS.bookmarks} />
    </>
  )
}
