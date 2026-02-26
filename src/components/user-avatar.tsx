import { Avatar, AvatarImage } from '@/components/ui/avatar'

type UserAvatarProps = {
  user: {
    name: string
    image: string | null
  }
  className?: string
}

export default function UserAvatar({ user, className = '' }: UserAvatarProps) {
  const { name, image } = user

  return (
    <Avatar className={className}>
      <AvatarImage src={image ?? '/avatar-placeholder.webp'} alt={name} />
    </Avatar>
  )
}
