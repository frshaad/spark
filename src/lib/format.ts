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

export function formatCount(value: number): string {
  if (!Number.isFinite(value)) return '0';

  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  const format = (num: number, suffix: string) => {
    const rounded = Math.round(num * 10) / 10;
    return `${sign}${rounded % 1 === 0 ? rounded.toFixed(0) : rounded}${suffix}`;
  };

  if (abs < 1_000) return `${value}`;
  if (abs < 1_000_000) return format(abs / 1_000, 'K');
  if (abs < 1_000_000_000) return format(abs / 1_000_000, 'M');
  if (abs < 1_000_000_000_000) return format(abs / 1_000_000_000, 'B');

  return format(abs / 1_000_000_000_000, 'T');
}
