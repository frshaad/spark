import { redirect } from 'next/navigation';
import Navbar from '@/components/navbar';
import { getServerSession } from '@/lib/session';

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  if (!session) redirect('/login');
  if (!session.user.username) redirect('/add-username');

  return (
    <div className="container mx-auto h-screen gap-10 lg:flex lg:pt-4 xl:gap-20">
      <Navbar />
      {children}
    </div>
  );
}
