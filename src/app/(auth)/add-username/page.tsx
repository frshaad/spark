import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { AuthCard } from '@/components/auth/auth-card';
import UsernameForm from '@/components/auth/username-form';
import { getServerSession } from '@/lib/session';

export default async function AddUsernamePage() {
  const session = await getServerSession();
  if (session?.user.username) redirect('/');

  return (
    <AuthCard
      title="Add Username"
      description="Enter a unique username for your account"
    >
      <UsernameForm />
    </AuthCard>
  );
}

export const metadata: Metadata = {
  title: 'Add Username | Spark',
};
