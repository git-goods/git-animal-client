import { encode } from 'next-auth/jwt';
import type { BrowserContext } from '@playwright/test';

/**
 * Seeds a NextAuth session cookie so authenticated flows can be tested without
 * going through GitHub OAuth. Requires NEXTAUTH_SECRET to match the running app.
 *
 * The token shape mirrors auth.ts's jwt callback (user fields spread onto the
 * token; the session callback exposes them as session.user). Adjust `user` to a
 * valid test account if your assertions read specific fields.
 *
 * Used by the (skipped-by-default) authenticated interceptor test — enable it
 * once a test secret + accessToken are available in the E2E env.
 */
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
