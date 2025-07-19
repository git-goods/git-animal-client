import type { NextRequest } from 'next/server';
import NextAuth from 'next-auth';

import { authOptions } from '@/auth';

export async function POST(req: NextRequest) {
  try {
    console.log('[Server Debug] Received RN WebView callback request');
    const body = await req.json();
    const { token, callbackUrl } = body;

    console.log('[Server Debug] Request body:', {
      hasToken: !!token,
      callbackUrl,
    });

    if (!token) {
      console.log('[Server Debug] No token provided');
      return new Response(JSON.stringify({ error: 'No token provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // NextAuth 세션 생성
    console.log('[Server Debug] Creating NextAuth session');
    const nextauth = await NextAuth(authOptions);
    const session = await nextauth.signIn('rn-webview', {
      token,
      redirect: false,
    });

    console.log('[Server Debug] SignIn result:', {
      hasSession: !!session,
      hasError: !!session?.error,
    });

    if (!session || session.error) {
      console.log('[Server Debug] Authentication failed:', session?.error);
      return new Response(JSON.stringify({ error: session?.error || 'Authentication failed' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 세션 쿠키 설정
    console.log('[Server Debug] Authentication successful, sending response');
    const response = new Response(
      JSON.stringify({
        url: callbackUrl || '/',
        success: true,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );

    return response;
  } catch (error) {
    console.error('[Server Debug] RN WebView callback error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
