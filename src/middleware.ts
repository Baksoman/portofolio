import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Cache static assets
  if (request.nextUrl.pathname.startsWith('/assets/') || 
      /\.(svg|jpg|jpeg|png|gif|ico|webp|woff2|woff|ttf)$/i.test(request.nextUrl.pathname)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  return response;
}

export const config = {
  matcher: ['/assets/:path*', '/:path*.(svg|jpg|jpeg|png|gif|ico|webp|woff2|woff|ttf)'],
};
