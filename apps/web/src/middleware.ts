import type { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest, res: NextResponse) {
  //   const code = req.cookies.get('token')?.value;
  // const token = new URLSearchParams(request.nextUrl.search);
  // console.log('request.nextUrl.href: ', request.nextUrl.href);
  // console.log('token: ', token);
  // console.log('req.url: ', request.nextUrl);
  //   console.log('token: ', token);
  //   if (!code) {
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.png).*)'],
};
