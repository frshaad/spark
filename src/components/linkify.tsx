import Link from 'next/link';
import { LinkIt, LinkItUrl } from 'react-linkify-it';
import { USERNAME_PATTERN } from '@/lib/validation/auth';

const AT_USERNAME_REGEX = new RegExp(`(?<!\\w)@${USERNAME_PATTERN}`, 'g');
const HASHTAG_REGEX = /(#[a-zA-Z0-9_]+)/;

export default function Linkify({ children }: React.PropsWithChildren) {
  return (
    <LinkifyUsername>
      <LinkifyHashtag>
        <LinkifyURL>{children}</LinkifyURL>
      </LinkifyHashtag>
    </LinkifyUsername>
  );
}

function LinkifyURL({ children }: React.PropsWithChildren) {
  return (
    <LinkItUrl className="text-primary hover:underline">{children}</LinkItUrl>
  );
}

function LinkifyUsername({ children }: React.PropsWithChildren) {
  return (
    <LinkIt
      regex={AT_USERNAME_REGEX}
      component={(match, key) => (
        <Link
          key={key}
          href={`/${match.slice(1)}`}
          className="text-primary hover:underline"
        >
          {match}
        </Link>
      )}
    >
      {children}
    </LinkIt>
  );
}

function LinkifyHashtag({ children }: React.PropsWithChildren) {
  return (
    <LinkIt
      regex={HASHTAG_REGEX}
      component={(match, key) => (
        <Link
          key={key}
          href={`/topics/${match.slice(1)}`}
          className="text-primary hover:underline"
        >
          {match}
        </Link>
      )}
    >
      {children}
    </LinkIt>
  );
}
