import type { NextRequest } from 'next/server';
import withAuth from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const publicPages = ['/', '/auth', '/event/HALLOWEEN_2024', '/event/CHRISTMAS_2024', '/test/ranking'];

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false,
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
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join('|')}))?(${publicPages.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i',
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
