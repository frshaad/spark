import type { Metadata } from 'next'
import Chat from '@/components/chat'

export default function DirectPage() {
  return <Chat />
}

export const metadata: Metadata = {
  title: 'Direct Messages',
}
