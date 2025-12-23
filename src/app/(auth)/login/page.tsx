import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { AuthCard } from '@/components/auth/auth-card';
import LoginForm from '@/components/auth/login-form';
import { getServerSession } from '@/lib/session';

export default async function SigninPage() {
  const session = await getServerSession();
  if (session) redirect('/');

  return (
    <AuthCard title="Login" description="Enter your information below to login">
      <LoginForm />
    </AuthCard>
  );
}

export const metadata: Metadata = {
  title: 'Login | Spark',
  description:
    'Log in to your Spark account to access your dashboard and manage your projects.',
};
