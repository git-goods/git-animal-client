import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createIntlMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const publicPaths = ['/', '/auth'];
const locales = ['ko', 'en'];

const intlMiddleware = createIntlMiddleware({
  ...routing,
});

const withAuth = async (request: NextRequest) => {
  const token = await getToken({ req: request });
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth';
    return NextResponse.redirect(url);
  }
  return intlMiddleware(request);
};

function isPublicPath(pathname: string): boolean {
  return publicPaths.some(
    (publicPath) =>
      pathname === publicPath ||
      pathname.startsWith(`/${locales[0]}${publicPath}`) ||
      pathname.startsWith(`/${locales[1]}${publicPath}`),
  );
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 항상 intlMiddleware를 먼저 실행
  const response = await intlMiddleware(request);

  // Public 경로이거나 API 요청이면 인증 검사 없이 통과
  if (isPublicPath(pathname) || pathname.startsWith('/api')) {
    return response;
  }

  // 그 외의 경우 인증 검사
  return withAuth(request);
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
