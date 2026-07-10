import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
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

const extractLocale = (pathname: string): string | null => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;
  return (routing.locales as readonly string[]).includes(segments[0]) ? segments[0] : null;
};

// With `localeDetection: true`, locale-detected entry routes vary by
// `accept-language` and the `NEXT_LOCALE` cookie, but next-intl sets no `Vary`
// header. Add one so a shared/CDN cache never serves a wrong-locale response.
const withVary = (response: Response) => {
  if (response instanceof NextResponse) {
    response.headers.set('Vary', 'Accept-Language, Cookie');
  }
  return response;
};

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

  if (isPublicPage) {
    return withVary(intlMiddleware(modifiedRequest));
  }

  const token = await getToken({ req });
  if (!token) {
    // 보호 라우트 비인증 접근 → 홈으로. 원래 목적지는 callbackUrl 로 보존해 로그인 후 복귀시킨다.
    // 만료/비로그인을 구분하지 않고 일반 로그인 진입으로 통일 — 익명 사용자에게 '세션 만료' 안내가
    // 뜨는 오작동을 막는다. (실제 세션 만료 안내는 클라이언트 401 인터셉터가 담당)
    const locale = extractLocale(req.nextUrl.pathname) ?? routing.defaultLocale;
    const callbackUrl = req.nextUrl.pathname + req.nextUrl.search;
    const redirectUrl = new URL(`/${locale}`, req.url);
    redirectUrl.searchParams.set('callbackUrl', callbackUrl);
    return withVary(NextResponse.redirect(redirectUrl));
  }

  return withVary(intlMiddleware(modifiedRequest));
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
