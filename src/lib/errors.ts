import { NextResponse } from 'next/server';

export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function handleRouteError(error: unknown) {
  // Expected, controlled errors
  if (error instanceof HttpError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status },
    );
  }

  // Prisma error
  if (
    error instanceof Error &&
    error.name === 'PrismaClientKnownRequestError'
  ) {
    return NextResponse.json({ error: 'Database error' }, { status: 400 });
  }

  // Log unexpected errors (important)
  console.error('Unhandled route error:', error);

  // Generic fallback
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}
