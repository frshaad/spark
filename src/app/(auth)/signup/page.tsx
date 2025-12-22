import { Metadata } from 'next';
import { AuthCard } from '@/components/auth/auth-card';
import SignupForm from '@/components/auth/signup-form';

export default function SignupPage() {
  return (
    <AuthCard
      title="Create an account"
      description="Enter your information below to create an account"
    >
      <SignupForm />
    </AuthCard>
  );
}

export const metadata: Metadata = {
  title: 'Create an Account | Spark',
  description:
    'Sign up for YourAppName and start managing your projects in minutes.',
};
