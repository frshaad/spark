import { X } from 'lucide-react'
import { ChannelList } from 'stream-chat-react'
import { useAuth } from '@/hooks/use-auth'

interface ChatSidebarProps {
  onClose?: () => void
}

export default function ChatSidebar({ onClose }: ChatSidebarProps) {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className='flex h-full w-full flex-col border-e'>
      {/* Mobile close button */}
      <div className='flex items-center justify-between border-b p-3 lg:hidden'>
        <h2 className='text-sm font-semibold'>Channels</h2>
        <button
          onClick={onClose}
          className='rounded-md p-1 hover:bg-slate-100 dark:hover:bg-slate-800'
          aria-label='Close sidebar'
        >
          <X className='size-4' />
        </button>
      </div>

      {/* Channel list */}
      <ChannelList
        filters={{ type: 'messaging', members: { $in: [user.id] } }}
        showChannelSearch
        options={{
          state: true,
          presence: true,
          limit: 10,
        }}
        sort={{ last_message_at: -1 }}
        additionalChannelSearchProps={{
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: {
              filters: { members: { $in: [user.id] } },
            },
          },
        }}
      />
    </div>
  )
}
