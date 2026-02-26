import { StreamChat } from 'stream-chat'

const streamServerClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_KEY!,
  process.env.STREAM_SECRET,
)

export function createToken(userId: string, exp: number, iat: number) {
  return streamServerClient.createToken(userId, exp, iat)
}

export function createStreamUser({
  id,
  image,
  name,
  username,
}: {
  id: string
  name: string
  username: string
  image: string | undefined
}) {
  return streamServerClient.upsertUser({
    id,
    username,
    name,
    image,
  })
}
