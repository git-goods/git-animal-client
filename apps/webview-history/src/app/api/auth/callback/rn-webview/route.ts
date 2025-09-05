import type { NextRequest } from 'next/server';
import { signIn } from 'next-auth/react';
import { getUserByToken } from '@gitanimals/api';

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

    // 토큰 유효성 검증
    console.log('[Server Debug] Validating token');
    try {
      const userData = await getUserByToken(`Bearer ${token}`);
      if (!userData) {
        console.log('[Server Debug] Invalid token');
        return new Response(JSON.stringify({ error: 'Invalid token' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      console.log('[Server Debug] Token validation successful:', userData.username);
    } catch (error) {
      console.error('[Server Debug] Token validation failed:', error);
      return new Response(JSON.stringify({ error: 'Token validation failed' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 성공 응답
    console.log('[Server Debug] Authentication successful, sending response');
    const response = new Response(
      JSON.stringify({
        url: callbackUrl || '/',
        success: true,
        token: token,
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
