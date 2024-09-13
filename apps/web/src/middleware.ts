import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const publicPages = ['/', '/auth'];

const intlMiddleware = createMiddleware({
  ...routing,
  // localeDetection: false,
});

export default async function middleware(req: NextRequest) {
  // const publicPathnameRegex = RegExp(
  //   `^(/(${routing.locales.join('|')}))?(${publicPages.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
  //   'i',
  // );
  // const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  return intlMiddleware(req);

  // if (isPublicPage) {
  //   return intlMiddleware(req);
  // } else {
  //   try {
  //     const token = await getToken({ req, secret: process.env.JWT_SECRET });
  //     console.log('token: ', Boolean(token));

  //     if (token) {
  //       return intlMiddleware(req);
  //     } else {
  //       // '/' 페이지로 리다이렉트하면서 intlMiddleware 적용
  //       const intlResponse = intlMiddleware(req);
  //       const url = new URL('/', req.url);

  //       // 현재 경로를 쿼리 파라미터로 추가
  //       url.searchParams.set('callbackUrl', req.nextUrl.pathname);

  //       // 국제화된 응답의 헤더를 유지하면서 리다이렉트
  //       const redirectResponse = NextResponse.redirect(url);
  //       intlResponse.headers.forEach((value, key) => {
  //         redirectResponse.headers.set(key, value);
  //       });

  //       return redirectResponse;
  //     }
  //   } catch (error) {
  //     console.error('Middleware error:', error);
  //     // 에러 발생 시 기본 리다이렉트
  //     return NextResponse.redirect(new URL('/', req.url));
  //   }
  // }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
