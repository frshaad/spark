import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { AuthCard } from '@/components/auth/auth-card';
import SignupForm from '@/components/auth/signup-form';
import { getSession } from '@/lib/session';

export default async function SignupPage() {
  const session = await getSession();
  if (session) redirect('/');

  return (
    <AuthCard
      title='Create an account'
      description='Enter your information below to create an account'
    >
      <SignupForm />
    </AuthCard>
  );
}

export const metadata: Metadata = {
  title: 'Create an Account | Spark',
  description: 'Sign up for YourAppName and start managing your projects in minutes.',
};
