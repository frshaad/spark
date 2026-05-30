import { Channel, ChannelHeader, MessageInput, MessageList, Window } from 'stream-chat-react'

export default function ChatChannel() {
  return (
    <div className='flex w-full flex-1 flex-col overflow-hidden'>
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </div>
  )
}
