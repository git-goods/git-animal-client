import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const publicPages = ['/', '/auth', '/auth/desktop', '/event/HALLOWEEN_2024', '/event/CHRISTMAS_2024', '/test/ranking'];

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false,
});

const extractLocale = (pathname: string): string | null => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;
  return (routing.locales as readonly string[]).includes(segments[0]) ? segments[0] : null;
};

export default async function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join('|')}))?(${publicPages.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i',
  );

  const authPrefixRegex = RegExp(`^(/(${routing.locales.join('|')}))?/auth(/|$)`, 'i');

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname) || authPrefixRegex.test(req.nextUrl.pathname);

  // URL 정보를 헤더에 추가한 새로운 요청 생성
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-pathname', req.nextUrl.pathname);

  const modifiedRequest = new NextRequest(req.url, {
    headers: requestHeaders,
  });

  if (isPublicPage) {
    return intlMiddleware(modifiedRequest);
  }

  const token = await getToken({ req });
  if (!token) {
    const locale = extractLocale(req.nextUrl.pathname) ?? routing.defaultLocale;
    const callbackUrl = req.nextUrl.pathname + req.nextUrl.search;
    const redirectUrl = new URL(`/${locale}`, req.url);
    redirectUrl.searchParams.set('session', 'expired');
    redirectUrl.searchParams.set('callbackUrl', callbackUrl);
    return NextResponse.redirect(redirectUrl);
  }

  return intlMiddleware(modifiedRequest);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
