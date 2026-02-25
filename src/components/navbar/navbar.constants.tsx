import { Bell, Bookmark, House, Send } from 'lucide-react'
import { NavigationButton } from '@/lib/types'

export const NAV_LINKS: Record<
  'home' | 'notifications' | 'messages' | 'bookmarks',
  NavigationButton
> = {
  home: {
    href: '/',
    label: 'Home',
    Icon: <House className='size-6' />,
  },
  notifications: {
    href: '/notifications',
    label: 'Notifications',
    Icon: <Bell className='size-6' />,
  },
  messages: {
    href: '/direct',
    label: 'Messages',
    Icon: <Send className='size-6' />,
  },
  bookmarks: {
    href: '/bookmarks',
    label: 'Bookmarks',
    Icon: <Bookmark className='size-6' />,
  },
}
