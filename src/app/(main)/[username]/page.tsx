import SignOutButton from '@/components/auth/signout-button';

export default async function ProfilePage({
  params,
}: PageProps<'/[username]'>) {
  const { username } = await params;

  return (
    <div>
      <h1>{username}</h1>
      <SignOutButton />
    </div>
  );
}
