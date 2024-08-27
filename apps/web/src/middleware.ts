import { type NextRequest, NextResponse } from 'next/server';
import type { JWT } from 'next-auth/jwt';
import { getToken } from 'next-auth/jwt';
import axios from 'axios';

import { getBaseUrl } from './utils/path';

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

const checkToken = async (request: NextRequest, token: any) => {
  return axios.get(getBaseUrl(request.url) + '/api/auth/verifyToken' + `?token=${token?.accessToken}`);
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const token = await getToken({ req: request });

  if (token) {
    await checkToken(request, token)
      .then((res) => {
        return res.status === 200;
      })
      .catch(() => {
        const redirectRes = NextResponse.redirect(url);
        redirectRes.cookies.delete('next-auth.session-token');
        return redirectRes;
      });
  }

  const pathname = request.nextUrl.pathname;
  const isWithoutAuth = withoutAuthList.includes(pathname);

  if (!isWithoutAuth) return withAuth(request, token);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.webp$|.*\\.svg$).*)'],
};
