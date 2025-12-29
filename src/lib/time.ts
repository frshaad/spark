import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

// Customize language for better UX — shorter & closer to Twitter style
dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'just now',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1mo',
    MM: '%dmo',
    y: '1y',
    yy: '%dy',
  },
});

export function formatPostDate(date: Date): string {
  const now = dayjs();
  const from = dayjs(date);

  const diffDays = now.diff(from, 'day');

  if (diffDays < 1) {
    // under 24h → "just now", "12m", "3h"
    return from.fromNow();
  }

  if (diffDays < 7) {
    // 1-6 days → "3d"
    return from.fromNow();
  }

  if (now.year() === from.year()) {
    // same year → "Jan 3"
    return from.format('MMM D');
  }

  // previous years → "Jan 3, 2023"
  return from.format('MMM D, YYYY');
}
