import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

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

  const diffSeconds = now.diff(from, 'second');
  const diffDays = now.diff(from, 'day');

  // 0–44s → "just now"
  if (diffSeconds < 45) {
    return 'just now';
  }

  // < 7 days → "3m", "5h", "2d"
  if (diffDays < 7) {
    return from.fromNow();
  }

  // Same year → "Jan 3"
  if (now.year() === from.year()) {
    return from.format('MMM D');
  }

  // Older → "Jan 3, 2023"
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

export function formatJoinedDate(date: Date): string {
  return dayjs(date).format('MMMM YYYY');
}

// export function formatCount(count: number): string {
//   if (count >= 1_000_000) {
//     return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
//   }
//   if (count >= 1_000) {
//     return `${(count / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
//   }
//   return count.toString();
// }

// **************** Text Direction ****************
// Strong RTL ranges: Arabic, Hebrew, Persian, Urdu, etc.
const RTL_CHAR_REGEX = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;

export function isRTL(text: string): boolean {
  return RTL_CHAR_REGEX.test(text);
}
