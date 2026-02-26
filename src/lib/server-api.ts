import type { NextRequest } from 'next/server'
import type { CommentRecord, CursorPaginated, CursorPaginatedComments } from '@/lib/types'

export function buildCursorPaginatedByKey<T extends { id: string }, K extends string>({
  key,
  items,
  pageSize,
  filter,
}: {
  key: K
  items: T[]
  pageSize: number
  filter?: (item: T) => boolean
}): CursorPaginated<T, K> {
  const validItems = filter ? items.filter(filter) : items

  const hasNextPage = validItems.length > pageSize
  const nextCursor = hasNextPage ? validItems[pageSize].id : null

  return {
    [key]: validItems.slice(0, pageSize),
    nextCursor,
  } as CursorPaginated<T, K>
}

export function buildCursorPaginatedComments(
  comments: CommentRecord[],
  pageSize: number,
): CursorPaginatedComments {
  const hasNextPage = comments.length > pageSize

  const paginatedComments = hasNextPage ? comments.slice(0, pageSize) : comments

  const nextCursor = hasNextPage ? paginatedComments[paginatedComments.length - 1].id : null

  return {
    comments: paginatedComments,
    nextCursor,
  }
}

export function getCursorPaginationParams(req: NextRequest, pageSize = 5) {
  const cursor = req.nextUrl.searchParams.get('cursor') || undefined

  return { cursor, pageSize }
}
