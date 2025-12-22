import { requireUser } from '@/lib/session';
import UserButton from './user-button';

export default async function ProfileButton() {
  const { user } = await requireUser();

  return (
    <UserButton name={user.name} username={user.username} image={user.image} />
  );
}
