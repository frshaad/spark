'use client'

import { useQuery } from '@tanstack/react-query'
import type { NotificationCountInfo } from '@/lib/types'
import { formatCount } from '@/lib/format'
import { getNotificationUnreadCountQuery } from '@/lib/queries'
import NavButton from './nav-button'
import { NAV_LINKS } from './navbar.constants'

type NotificationNavButtonProps = {
  initialState: NotificationCountInfo
}

export default function NotificationNavButton({ initialState }: NotificationNavButtonProps) {
  const { data } = useQuery(getNotificationUnreadCountQuery(initialState))

  return (
    <NavButton
      {...NAV_LINKS.notifications}
      counter={data.unreadCount > 0 ? formatCount(data.unreadCount) : null}
    />
  )
}
