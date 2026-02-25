import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/ky'
import { QUERY_KEYS } from '@/lib/query-keys'

export default function useMarkNotificationsRead() {
  return useMutation({
    mutationFn: () => api.patch('notifications/mark-as-read'),

    onSuccess(_data, _vars, _res, { client }) {
      client.setQueryData(QUERY_KEYS.unreadNotificationCount, { unreadCount: 0 })
    },

    onError(error) {
      console.error(error)
    },
  })
}
