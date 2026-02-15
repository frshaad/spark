import { useMemo } from 'react';
import Linkify from '@/components/linkify';
import { isRTL } from '@/lib/format';
import { cn } from '@/lib/utils';

export default function PostContent({ content }: { content: string }) {
  const isContentRtl = useMemo(() => isRTL(content), [content]);

  return (
    <Linkify>
      <p
        dir={isContentRtl ? 'rtl' : 'ltr'}
        className={cn(
          'mb-3 text-sm leading-relaxed wrap-break-word whitespace-pre-wrap',
          isContentRtl ? 'font-vazir text-right' : 'font-inter text-left',
        )}
      >
        {content}
      </p>
    </Linkify>
  );
}
