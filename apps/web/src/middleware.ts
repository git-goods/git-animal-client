import type { NextFetchEvent, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  // 로그인 했을 경우에만 존재함 ( "next-auth.session-token" 쿠키가 존재할 때 )
  const session = await getToken({ req, secret, raw: true });
  //   console.log('session: ', session);
}

export const config = {
  matcher: ['/dev'],
};
