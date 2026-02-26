import { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import { api } from '@/lib/ky'
import { useAuth } from './use-auth'

export function useInitializeChatClient() {
  const { user } = useAuth()
  const [chatClient, setChatClient] = useState<StreamChat | null>(null)

  useEffect(() => {
    if (!user) return

    const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!)

    void client
      .connectUser(
        {
          id: user.id,
          username: user.username ?? user.id,
          name: user.name,
          image: user.image ?? undefined,
        },
        async () =>
          api
            .get('get-token')
            .json<{ token: string }>()
            .then(data => data.token),
      )
      .catch(error => console.error('Failed to connect user', error))
      .then(() => setChatClient(client))

    return () => {
      setChatClient(null)
      void client
        .disconnectUser()
        .catch(error => console.error('Failed to disconnect user', error))
        .then(() => console.log('Connection closed'))
    }
  }, [user, user?.id, user?.name, user?.username, user?.image])

  return chatClient
}
