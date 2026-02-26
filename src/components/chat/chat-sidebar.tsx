import { ChannelList } from 'stream-chat-react'
import { useAuth } from '@/hooks/use-auth'

export default function ChatSidebar() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className='flex size-full flex-col border-e md:w-72'>
      <ChannelList filters={{ type: 'messaging', members: { $in: [user.id] } }} showChannelSearch />
    </div>
  )
}
