import { NextResponse } from 'next/server';
import { Prisma } from '@/generated/prisma/client';

export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string, options?: { cause?: unknown }) {
    super(message);
    this.name = 'HttpError';
    this.status = status;

    if (options?.cause) {
      this.cause = options.cause;
    }
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden') {
    super(403, message);
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'Bad request') {
    super(400, message);
  }
}

export function handleApiError(error: unknown) {
  // Expected, controlled errors
  if (error instanceof HttpError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  // Prisma error
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error('Prisma error:', error);

    return NextResponse.json({ error: 'Database operation failed' }, { status: 400 });
  }

  // Log unexpected errors (important)
  console.error('Unhandled route error:', error);

  // Generic fallback
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}
