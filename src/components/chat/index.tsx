'use client'

import { Loader2 } from 'lucide-react'
import { useTheme } from 'next-themes'
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

  const { resolvedTheme } = useTheme()

  return (
    <Card className='relative w-full overflow-hidden max-lg:rounded-none'>
      <div className='absolute top-0 bottom-0 flex w-full'>
        <StreamChat
          client={chatClient}
          theme={resolvedTheme === 'dark' ? 'str-chat__theme-dark' : 'str-chat__theme-light'}
        >
          <ChatSidebar />
          <ChatChannel />
        </StreamChat>
      </div>
    </Card>
  )
}
