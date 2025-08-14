import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    cookieStore.delete('next-auth.session-token');
    cookieStore.delete('next-auth.csrf-token');
    cookieStore.delete('next-auth.callback-url');

    // 절대 URL로 리다이렉트
    const baseUrl = process.env.NEXTAUTH_URL || `${request.nextUrl.protocol}//${request.nextUrl.host}`;
    return NextResponse.redirect(`${baseUrl}/`);
  } catch (error) {
    console.error('[SignOut API] Error:', error);
    return NextResponse.json({ error: 'SignOut failed' }, { status: 500 });
  }
}
