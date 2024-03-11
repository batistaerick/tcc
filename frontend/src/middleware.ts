import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(
  request: NextRequest
): Promise<NextResponse<unknown>> {
  const {
    nextUrl: { pathname, origin },
  } = request;

  if (!request.cookies.has('next-auth.session-token')) {
    return NextResponse.redirect(new URL('/auth', origin));
  }
  if (pathname === '/analytics') {
    return NextResponse.next();
  }
  await fetch(`${origin}/api/analytics`, {
    method: 'POST',
    body: JSON.stringify({ path: pathname }),
  });
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/profile', '/goals', '/new-transaction', '/analytics'],
};
