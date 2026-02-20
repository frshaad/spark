import DiscoveryPanel from '@/components/discovery-panel';

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full gap-6 lg:pr-10 xl:gap-10">
      <main className="no-scrollbar mx-auto w-11/12 max-w-4xl space-y-5 overflow-y-auto p-1 py-4 lg:min-w-sm">
        {children}
      </main>
      <DiscoveryPanel />
    </div>
  );
}
