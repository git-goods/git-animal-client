import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createIntlMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

// const publicPathsWithoutLocale = ['', 'auth']; // 주의: 루트 경로는 빈 문자열로 표현
const publicPathsWithoutLocale = new Set(['', 'auth']); // Set for faster lookups

const locales = routing.locales;
const defaultLocale = routing.defaultLocale;
const intlMiddleware = createIntlMiddleware({
  ...routing,
  localeDetection: false,
});

const withAuth = async (request: NextRequest) => {
  const token = await getToken({ req: request });
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = `/${request.nextUrl.locale}/auth`;
    return NextResponse.redirect(url);
  }
  return intlMiddleware(request);
};

function isPublicPath(pathname: string): boolean {
  // locale을 제거한 경로 추출
  const pathWithoutLocale = pathname.split('/').slice(2).join('/');
  return publicPathsWithoutLocale.has(pathWithoutLocale);
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 항상 intlMiddleware를 먼저 실행
  const response = await intlMiddleware(request);

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale = request.cookies.get('NEXT_LOCALE')?.value || defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

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
