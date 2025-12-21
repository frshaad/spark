import { History } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function LastUsedMethodBadge() {
  return (
    <Badge className="absolute -top-2 -right-4" variant="secondary">
      <History className="size-3" />
      Last used
    </Badge>
  );
}
