import { Metadata } from 'next';
import { AuthCard } from '@/components/auth/auth-card';
import LoginForm from '@/components/auth/login-form';

export default function SigninPage() {
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
