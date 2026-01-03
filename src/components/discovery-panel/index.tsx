import TrendingTopics from './trending-topics';
import WhoToFollow from './who-to-follow';

export default function DiscoveryPanel() {
  return (
    <aside className="sticky top-0 right-0 h-fit w-96 space-y-5 max-lg:hidden">
      <WhoToFollow />
      <TrendingTopics />
    </aside>
  );
}
