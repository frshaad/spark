'use client'

import { Loader2, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { Chat as StreamChat } from 'stream-chat-react'
import { Card } from '@/components/ui/card'
import { useInitializeChatClient } from '@/hooks/use-initialize-chat-client'
import ChatChannel from './chat-channel'
import ChatSidebar from './chat-sidebar'

export default function Chat() {
  const { resolvedTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const chatClient = useInitializeChatClient()

  if (!chatClient) {
    return <Loader2 className='mx-auto my-3 animate-spin' />
  }

  return (
    <Card className='relative w-full overflow-hidden max-lg:rounded-none'>
      <div className='absolute top-0 bottom-0 flex w-full flex-col lg:flex-row'>
        <StreamChat
          client={chatClient}
          theme={resolvedTheme === 'dark' ? 'str-chat__theme-dark' : 'str-chat__theme-light'}
        >
          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div
              className='fixed inset-0 z-40 bg-black/50 lg:hidden'
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`absolute inset-y-0 left-0 z-50 w-full transform bg-white transition-transform duration-300 ease-in-out max-lg:flex max-lg:flex-col max-lg:rounded-none sm:w-80 lg:static lg:w-72 lg:transform-none lg:transition-none dark:bg-slate-950 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
          >
            <ChatSidebar onClose={() => setSidebarOpen(false)} />
          </div>

          {/* Main content */}
          <div className='flex flex-1 flex-col'>
            {/* Mobile header with toggle */}
            <div className='flex items-center justify-between border-b bg-white p-3 lg:hidden dark:border-slate-700 dark:bg-slate-950'>
              <h1 className='text-sm font-semibold'>Messages</h1>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className='rounded-md p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800'
                aria-label='Toggle sidebar'
              >
                {sidebarOpen ? <X className='size-5' /> : <Menu className='size-5' />}
              </button>
            </div>

            {/* Chat channel */}
            <ChatChannel />
          </div>
        </StreamChat>
      </div>
    </Card>
  )
}
