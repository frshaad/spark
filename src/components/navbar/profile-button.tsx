import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { requireUser } from '@/lib/session';
import { Button } from '../ui/button';

export default async function ProfileButton() {
  const { user } = await requireUser();

  return (
    <Button
      variant="ghost"
      size="lg"
      className="relative ml-10 h-14 w-full justify-start gap-5 rounded-full text-lg"
    >
      <Avatar>
        <AvatarImage src={user.image ?? undefined} alt={user.name} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <span>{user.name}</span>
    </Button>
  );
}
