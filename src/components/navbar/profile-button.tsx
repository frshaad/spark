import { requireOnboardedUser } from '@/lib/session';
import UserButton from './user-button';

export default async function ProfileButton() {
  const { user } = await requireOnboardedUser();

  return (
    <UserButton
      user={{
        name: user.name,
        username: user.username,
        image: user.image ?? null,
      }}
    />
  );
}
