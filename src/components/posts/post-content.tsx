import { cn } from '@/lib/utils';

export default function PostContent({
  content,
  isRtl,
}: {
  content: string;
  isRtl: boolean;
}) {
  return (
    <p
      dir={isRtl ? 'rtl' : 'ltr'}
      className={cn(
        'mb-3 text-sm leading-relaxed wrap-break-word whitespace-pre-wrap',
        isRtl ? 'font-vazir text-right' : 'font-inter text-left',
      )}
    >
      {content}
    </p>
  );
}
