import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const publicPages = ['/', '/auth'];

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false,
});

export default async function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join('|')}))?(${publicPages.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i',
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    if (token != null) {
      return intlMiddleware(req);
    } else {
      // '/' 페이지로 리다이렉트
      const response = intlMiddleware(req);
      const url = new URL('/', req.url);

      // 현재 경로를 쿼리 파라미터로 추가 (선택적)
      url.searchParams.set('callbackUrl', req.nextUrl.pathname);

      // 국제화된 응답의 헤더를 유지하면서 리다이렉트
      const redirectResponse = NextResponse.redirect(url);
      response.headers.forEach((value, key) => {
        redirectResponse.headers.set(key, value);
      });

      return redirectResponse;
    }
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
