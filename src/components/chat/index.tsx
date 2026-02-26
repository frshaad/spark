'use client'

import { Loader2 } from 'lucide-react'
import { Chat as StreamChat } from 'stream-chat-react'
import { Card } from '@/components/ui/card'
import { useInitializeChatClient } from '@/hooks/use-initialize-chat-client'
import ChatChannel from './chat-channel'
import ChatSidebar from './chat-sidebar'

export default function Chat() {
  const chatClient = useInitializeChatClient()

  if (!chatClient) {
    return <Loader2 className='mx-auto my-3 animate-spin' />
  }

  return (
    <Card className='relative w-full overflow-hidden'>
      <div className='absolute top-0 bottom-0 flex w-full'>
        <StreamChat client={chatClient}>
          <ChatSidebar />
          <ChatChannel />
        </StreamChat>
      </div>
    </Card>
  )
}
