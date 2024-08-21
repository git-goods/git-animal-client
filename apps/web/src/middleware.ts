import { type NextRequest, NextResponse } from 'next/server';
import type { JWT } from 'next-auth/jwt';
import { getToken } from 'next-auth/jwt';

const withoutAuthList = ['/', '/auth'];

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

  if (!isWithoutAuth) return withAuth(request, token);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.webp$|.*\\.svg$).*)'],
};
