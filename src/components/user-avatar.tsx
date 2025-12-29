import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function UserAvatar({
  image,
  name,
  className = '',
}: {
  image?: string | null;
  name: string;
  className?: string;
}) {
  return (
    <Avatar className={className}>
      <AvatarImage src={image || '/avatar-placeholder.webp'} alt={name} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  );
}
