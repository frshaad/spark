import { redirect } from 'next/navigation';
import BackgroundPattern from '@/components/background-pattern';
import { getServerSession } from '@/lib/session';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  if (session) redirect('/');

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <BackgroundPattern />
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
