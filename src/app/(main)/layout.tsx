import Navbar from '@/components/navbar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { requireAuth } from '@/lib/session';

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAuth();

  return (
    <TooltipProvider delay={400}>
      <div className="mx-auto h-screen gap-10 lg:flex lg:pt-4 xl:gap-20">
        <Navbar />
        {children}
      </div>
    </TooltipProvider>
  );
}
