import { redirect } from 'next/navigation';
import DiscoveryPanel from '@/components/discovery-panel';
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
    <div className="min-h-screen gap-5 lg:flex">
      <Navbar />
      <main className="w-full pt-6">{children}</main>
      <DiscoveryPanel />
    </div>
  );
}
