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

  return (
    <div className="flex min-h-screen gap-5">
      <Navbar />
      <main>{children}</main>
      <DiscoveryPanel />
    </div>
  );
}
