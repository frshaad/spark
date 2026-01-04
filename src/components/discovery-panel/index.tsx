import TrendingTopics from './trending-topics';
import WhoToFollow from './who-to-follow';

export default function DiscoveryPanel() {
  return (
    <aside className="min-w-64 space-y-5 max-lg:hidden">
      <WhoToFollow />
      <TrendingTopics />
    </aside>
  );
}
