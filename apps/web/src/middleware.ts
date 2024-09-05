import { type NextRequest, NextResponse } from 'next/server';
import type { JWT } from 'next-auth/jwt';
import { getToken } from 'next-auth/jwt';
import createIntlMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const withoutAuthList = ['/', '/auth'];

const intlMiddleware = createIntlMiddleware({
  ...routing,
});

const withAuth = (
  req: NextRequest,
  token: JWT | null,
  options?: {
    redirectUrl?: string;
  },
) => {
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = options?.redirectUrl ?? '/';

    return NextResponse.redirect(url);
  }
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  const pathname = request.nextUrl.pathname;
  const isWithoutAuth = withoutAuthList.includes(pathname);

  const pathnameIsMissingLocale = routing.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    return intlMiddleware(request);
  }

  if (!isWithoutAuth) return withAuth(request, token);

  // return intlMiddleware(request);

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/(ko|en)/:path*'],

  // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.webp$|.*\\.svg$).*)'],
};
