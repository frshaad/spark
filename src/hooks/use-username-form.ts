'use client'

import type { Route } from 'next'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'
import { usernameFormSchema } from '@/lib/validation/auth'

export function useUsernameForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const callbackURL = (searchParams.get('redirect') || '/') as Route

  const form = useForm({
    resolver: zodResolver(usernameFormSchema),
    defaultValues: { username: '' },
  })

  const handleSubmit = form.handleSubmit(({ username }) => {
    setError(null)
    startTransition(async () => {
      try {
        const { data: response, error: checkError } = await authClient.isUsernameAvailable({
          username,
        })

        if (checkError) {
          setError(checkError.message || 'Something went wrong')
        } else if (!response.available) {
          setError('Username is not available')
        } else if (response.available) {
          const { error } = await authClient.updateUser({ username })
          if (error) {
            setError(error.message || 'Something went wrong')
          } else {
            toast.success('Username Updated!')
            router.push(callbackURL)
          }
        }
      } catch {
        setError('An unexpected error occurred')
      }
    })
  })

  return {
    control: form.control,
    handleSubmit,
    isPending,
    error,
  }
}
