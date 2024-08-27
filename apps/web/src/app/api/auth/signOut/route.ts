import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  const cookieStore = cookies();
  cookieStore.delete('next-auth.session-token');

  // Your other logic here

  // const url = req.nextUrl.clone();

  return NextResponse.redirect('/');
  // return
  // return new Response('Cookie deleted', { status: 200 });
}
