import { ChannelList } from 'stream-chat-react'
import { useAuth } from '@/hooks/use-auth'

export default function ChatSidebar() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className='flex size-full flex-col border-e md:w-72'>
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
