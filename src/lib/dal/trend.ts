import { cacheLife, cacheTag } from 'next/cache';
import prisma from '@/lib/prisma';

export async function getTrendingTopics() {
  'use cache';
  cacheLife({ revalidate: 3 * 60 * 60 });
  cacheTag('trending-topics');

  const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
    SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
    FROM post
    GROUP BY (hashtag)
    ORDER BY count DESC, hashtag ASC
    LIMIT 5;
  `;

  return result.map((row) => ({
    hashtag: row.hashtag,
    count: Number(row.count),
  }));
}
