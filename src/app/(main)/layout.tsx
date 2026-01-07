import Navbar from '@/components/navbar';
import { requireOnboardedUser } from '@/lib/session';

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireOnboardedUser();

  return (
    <div className="mx-auto h-screen gap-10 lg:flex lg:pt-4 xl:gap-20">
      <Navbar />
      {children}
    </div>
  );
}
