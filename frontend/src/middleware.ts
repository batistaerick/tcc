import { Analytics } from '@/utils/analytics';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  const hasCookie = request.cookies.has('next-auth.session-token');

  if (!hasCookie) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
  try {
    const analytics = new Analytics();
    analytics.track('page-view', {
      page: '/',
      country: request.geo?.country,
    });
  } catch (error) {
    console.log(error);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/profile', '/new-transaction/'],
};
