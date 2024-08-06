import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const NO_AUTH_PATHS = ['/api', '/_next/static', '/_next/image', '/favicon.ico', '.png', '/auth'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('@gitanimals/auth-token');

  if (request.nextUrl.pathname === '/' || NO_AUTH_PATHS.some((path) => request.nextUrl.pathname.includes(path))) {
    return null;
  }

  if (!token) {
    console.log('token not found ');
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.webp$|.*\\.svg$).*)'],
};
