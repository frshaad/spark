import { useMemo } from 'react';
import type { Route } from 'next';
import Link from 'next/link';
import UserTooltip from '@/components/user-tooltip';
import { formatPostDate, isRTL } from '@/lib/format';
import type { PostView } from '@/lib/types';

export default function PostHeader({
  author,
  authorUrl,
  createdAt,
}: {
  author: PostView['author'];
  authorUrl: Route;
  createdAt: Date | string;
}) {
  const displayName = author.name;
  const isRtl = useMemo(() => isRTL(displayName), [displayName]);

  return (
    <div className="min-w-0">
      <div className="mb-1 flex items-center gap-2 text-sm">
        <UserTooltip user={author}>
          <Link
            href={authorUrl}
            onClick={(e) => e.stopPropagation()}
            className="font-semibold hover:underline"
          >
            <span dir={isRtl ? 'rtl' : 'ltr'}>{displayName}</span>
          </Link>

          <Link
            href={authorUrl}
            onClick={(e) => e.stopPropagation()}
            className="text-muted-foreground hover:underline"
          >
            <span dir="ltr">@{author.username}</span>
          </Link>
        </UserTooltip>

        <span className="text-muted-foreground">·</span>

        <span className="text-muted-foreground">
          {formatPostDate(new Date(createdAt))}
        </span>
      </div>
    </div>
  );
}
