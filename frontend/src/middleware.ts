import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(
  request: NextRequest
): Promise<NextResponse<unknown>> {
  if (!request.cookies.has('next-auth.session-token')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
  const pathname: string = request.nextUrl.pathname;
  const basePath: string = request.url;

  await fetch(`${basePath}/api/analytics`, {
    method: 'POST',
    body: JSON.stringify({ path: pathname }),
  });
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/profile', '/goals', '/new-transaction'],
};
