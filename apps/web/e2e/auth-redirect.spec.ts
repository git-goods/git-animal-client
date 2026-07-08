import { expect, test } from '@playwright/test';

/**
 * Covers the server-auth surface touched by the interceptor / getServerAuth
 * changes: a protected route must redirect an unauthenticated visitor to the
 * sign-in page ('/'), enforced by middleware before any page data is fetched.
 */
test.describe('auth redirect (unauthenticated)', () => {
  test('protected /guild redirects home', async ({ page }) => {
    await page.goto('/guild');
    // signIn page is '/' (see middleware.ts). Final URL is the localized home,
    // never the guild route.
    await expect(page).toHaveURL(/\/(en-US|ko-KR)?\/?(\?.*)?$/);
    expect(page.url()).not.toContain('/guild');
  });

  test('public / is reachable without auth', async ({ page }) => {
    const res = await page.goto('/');
    expect(res?.status()).toBeLessThan(400);
    expect(page.url()).not.toContain('/auth');
  });
});
