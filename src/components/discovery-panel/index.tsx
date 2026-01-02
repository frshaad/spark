import { Suspense } from 'react';
import WhoToFollow from './who-to-follow';

export default function DiscoveryPanel() {
  return (
    <aside className="sticky top-0 right-0 h-fit w-96 max-lg:hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <WhoToFollow />
      </Suspense>
    </aside>
  );
}
