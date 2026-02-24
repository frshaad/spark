'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUpload, LoaderCircle, UserPen } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type { UserRecord } from '@/lib/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { useUpdateProfile } from '@/hooks/use-update-profile'
import { type UpdateUserProfileValues, updateUserProfileSchema } from '@/lib/validation/user'
import AvatarInput from './avatar-input'

type EditProfileButtonProps = {
  user: UserRecord
}

export default function EditProfileButton({ user }: EditProfileButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null)

  const form = useForm<UpdateUserProfileValues>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      name: user.name,
      bio: user.bio || '',
    },
  })

  const { mutate, isPending, isAvatarUploading } = useUpdateProfile()

  const onSubmit = async (values: UpdateUserProfileValues) => {
    const avatar = croppedAvatar ? new File([croppedAvatar], `avatar_${user.id}.webp`) : undefined

    mutate(
      { values, avatar },
      {
        onSuccess() {
          setCroppedAvatar(null)
          setIsOpen(false)
        },
      },
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={<Button className='gap-1.5 rounded-full px-4 text-xs font-medium tracking-wide' />}
      >
        <UserPen />
        Edit Profile
      </DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Edit Profile</DialogTitle>
          <DialogDescription>Update your profile information.</DialogDescription>
        </DialogHeader>

        <div className='space-y-1.5'>
          <Label>Avatar</Label>
          <AvatarInput
            src={
              croppedAvatar
                ? URL.createObjectURL(croppedAvatar)
                : user.image || '/avatar-placeholder.webp'
            }
            onImageCroppedAction={setCroppedAvatar}
          />
        </div>

        <form
          id='update-profile-form'
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-10'
        >
          <FieldGroup>
            <Controller
              name='name'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='name-input'>Name</FieldLabel>
                  <Input
                    {...field}
                    id='name-input'
                    aria-invalid={fieldState.invalid}
                    placeholder='Enter your display name.'
                    autoComplete='name'
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name='bio'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='bio-input'>Bio</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id='bio-input'
                      placeholder='Tell us about yourself'
                      rows={6}
                      className='min-h-24 resize-none'
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align='block-end'>
                      <InputGroupText className='tabular-nums'>
                        {field.value.length}/250 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter className='sm:justify-start'>
            <DialogClose
              className='flex-1'
              render={
                <Button type='button' variant='outline' disabled={isPending}>
                  Close
                </Button>
              }
            />
            <Button className='flex-1' type='submit' disabled={isPending}>
              {isPending ? (
                isAvatarUploading ? (
                  <>
                    <CloudUpload /> Uploading...
                  </>
                ) : (
                  <>
                    <LoaderCircle className='animate-spin' /> Saving...
                  </>
                )
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
