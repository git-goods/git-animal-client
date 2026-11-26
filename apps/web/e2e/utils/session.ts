import { encode } from 'next-auth/jwt';
import type { BrowserContext } from '@playwright/test';

// NEXTAUTH_SECRET 이 실행 중인 앱과 같아야 쿠키가 풀린다.
export async function seedSession(
  context: BrowserContext,
  user: { id: string; name: string; accessToken: string; image?: string },
  baseURL = process.env.E2E_BASE_URL ?? 'http://localhost:3000',
): Promise<void> {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error('seedSession requires NEXTAUTH_SECRET to sign the session cookie');

  const token = await encode({ token: { ...user }, secret });
  const url = new URL(baseURL);

  await context.addCookies([
    {
      name: url.protocol === 'https:' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      value: token,
      domain: url.hostname,
      path: '/',
      httpOnly: true,
      secure: url.protocol === 'https:',
      sameSite: 'Lax',
    },
  ]);
}
