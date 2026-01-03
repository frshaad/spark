import { Route } from 'next';
import Link from 'next/link';
import { Item, ItemContent, ItemTitle } from '@/components/ui/item';
import { getTrendingTopics } from '@/lib/dal/trend';
import { formatCount } from '@/lib/format';

export default async function TopicsList() {
  const topics = await getTrendingTopics();

  return (
    <>
      {topics.map(({ hashtag, count }) => {
        const title = hashtag.split('#')[1];

        return (
          <Item key={title} size="xs">
            <ItemContent>
              <Link href={`/hashtag/${title}` as Route}>
                <ItemTitle>
                  <p
                    className="line-clamp-1 text-sm font-semibold break-all"
                    title={hashtag}
                  >
                    {hashtag}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {formatCount(count)}
                  </p>
                </ItemTitle>
              </Link>
            </ItemContent>
          </Item>
        );
      })}
    </>
  );
}
