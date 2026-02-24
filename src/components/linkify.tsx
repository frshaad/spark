'use client'

import Link from 'next/link'
import { LinkIt, hashtagRegex, mentionRegex, urlRegex } from 'react-linkify-it'

export default function Linkify({ children }: React.PropsWithChildren) {
  return (
    <LinkifyMention>
      <LinkifyHashtag>
        <LinkifyURL>{children}</LinkifyURL>
      </LinkifyHashtag>
    </LinkifyMention>
  )
}

function LinkifyURL({ children }: React.PropsWithChildren) {
  return (
    <LinkIt
      regex={urlRegex}
      component={(match, key) => (
        <Link
          key={key}
          href={new URL(match)}
          className='text-primary hover:underline'
          onClick={e => e.stopPropagation()}
        >
          {match.replace(/^(https?:\/\/)?(www\.)?/, (_, protocol) =>
            protocol === 'http://' ? 'http://' : '',
          )}
        </Link>
      )}
    >
      {children}
    </LinkIt>
  )
}

function LinkifyMention({ children }: React.PropsWithChildren) {
  return (
    <LinkIt
      regex={mentionRegex}
      component={(match, key) => (
        <Link
          key={key}
          href={`/${match.replace('@', '')}`}
          className='text-primary hover:underline'
          onClick={e => e.stopPropagation()}
        >
          {match}
        </Link>
      )}
    >
      {children}
    </LinkIt>
  )
}

function LinkifyHashtag({ children }: React.PropsWithChildren) {
  return (
    <LinkIt
      regex={hashtagRegex}
      component={(match, key) => (
        <Link
          key={key}
          href={`/topics/${match.replace('#', '')}`}
          className='text-primary hover:underline'
          onClick={e => e.stopPropagation()}
        >
          {match}
        </Link>
      )}
    >
      {children}
    </LinkIt>
  )
}
