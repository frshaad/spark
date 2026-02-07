import type { Route } from 'next';
import Link from 'next/link';
import { formatPostDate } from '@/lib/format';
import type { PostData } from '@/lib/types';

type Author = PostData['author'];

export default function PostHeader({
  author,
  authorUrl,
  createdAt,
  formatDate = (d: Date) => formatPostDate(d),
}: {
  author: Author;
  authorUrl: Route;
  createdAt: Date | string;
  formatDate?: (d: Date) => string;
}) {
  const displayName =
    author.displayUsername ?? author.name ?? author.username ?? 'User';

  return (
    <div className="min-w-0">
      <div className="mb-1 flex items-center gap-2 text-sm">
        <Link
          href={authorUrl}
          onClick={(e) => e.stopPropagation()}
          className="font-semibold hover:underline"
        >
          <span dir={/[\u0591-\u07FF]/.test(displayName) ? 'rtl' : 'ltr'}>
            {displayName}
          </span>
        </Link>

        <Link
          href={authorUrl}
          onClick={(e) => e.stopPropagation()}
          className="text-muted-foreground hover:underline"
        >
          <span dir="ltr">@{author.username}</span>
        </Link>

        <span className="text-muted-foreground">·</span>

        <span className="text-muted-foreground">
          {formatDate(new Date(createdAt))}
        </span>
      </div>
    </div>
  );
}
