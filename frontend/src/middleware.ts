import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  const hasCookie = request.cookies.has('next-auth.session-token');
  if (!hasCookie) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
}

export const config = {
  matcher: ['/', '/profile', '/new-transaction/'],
};
