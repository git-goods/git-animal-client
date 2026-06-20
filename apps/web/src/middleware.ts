import { NextRequest, NextResponse } from 'next/server';
import withAuth from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';

import { resolveLegacyLocalePath } from './i18n/legacyLocaleRedirect';
import { routing } from './i18n/routing';

const publicPages = ['/', '/auth', '/auth/desktop', '/event/HALLOWEEN_2024', '/event/CHRISTMAS_2024', '/test/ranking'];

const intlMiddleware = createMiddleware({
  ...routing,
  // Enabled now that `routing.locales` are valid BCP-47 tags (the matcher throws
  // on the old underscore form). Resolves locale by: URL prefix > NEXT_LOCALE
  // cookie > accept-language > defaultLocale.
  localeDetection: true,
});
const authMiddleware = withAuth((req) => intlMiddleware(req), {
  callbacks: {
    authorized: ({ token }) => token != null,
  },
  pages: {
    signIn: '/',
  },
});

export default async function middleware(req: NextRequest) {
  // 1) Backward-compat 308 redirect — MUST be the first statement, before the
  // public/protected classification and before the `x-pathname` header is set,
  // so the rest of the pipeline (intl/auth, RSC consumers of `x-pathname`) only
  // ever sees standard hyphen paths. Anchored to a full segment so `/en_USx`
  // never matches; query string is preserved by `clone()`.
  const legacyTarget = resolveLegacyLocalePath(req.nextUrl.pathname);
  if (legacyTarget) {
    const url = req.nextUrl.clone();
    url.pathname = legacyTarget;
    return NextResponse.redirect(url, 308);
  }

  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join('|')}))?(${publicPages.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i',
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  // URL 정보를 헤더에 추가한 새로운 요청 생성
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-pathname', req.nextUrl.pathname);

  const modifiedRequest = new NextRequest(req.url, {
    headers: requestHeaders,
  });

  const response = isPublicPage ? intlMiddleware(modifiedRequest) : (authMiddleware as any)(modifiedRequest);

  // With `localeDetection: true`, locale-detected entry routes vary by
  // `accept-language` and the `NEXT_LOCALE` cookie, but next-intl sets no `Vary`
  // header. Add one so a shared/CDN cache never serves a wrong-locale response.
  if (response instanceof NextResponse) {
    response.headers.set('Vary', 'Accept-Language, Cookie');
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
