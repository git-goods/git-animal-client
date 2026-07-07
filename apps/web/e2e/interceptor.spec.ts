import { expect, test } from '@playwright/test';

import { stubGitanimalsApi } from './utils/api-stub';
import { seedSession } from './utils/session';

/**
 * Covers the API-interceptor rewrite (single registration via
 * registerInterceptors + request-scoped auth). Asserts what the request
 * interceptor attaches to outbound gitanimals API calls.
 */
test.describe('API interceptor auth header', () => {
  test('unauthenticated: no Authorization header attached', async ({ page }) => {
    const { authHeaders } = await stubGitanimalsApi(page);

    await page.goto('/');
    // Landing fires client-side stat queries; wait for at least one to be seen.
    await expect.poll(() => authHeaders.length, { timeout: 15_000 }).toBeGreaterThan(0);

    // The interceptor must NOT invent a Bearer token when there is no session.
    expect(authHeaders.every((h) => h === undefined)).toBe(true);
  });

  /**
   * Authenticated token-injection. Skipped by default: needs NEXTAUTH_SECRET and
   * a valid test accessToken in the E2E env. Enable once those exist — it proves
   * registerInterceptors attaches `Authorization: Bearer <token>` on the client.
   */
  test.skip('authenticated: attaches Bearer token', async ({ page, context }) => {
    await seedSession(context, { id: 'test', name: 'e2e-user', accessToken: 'test-access-token' });
    const { authHeaders } = await stubGitanimalsApi(page);

    await page.goto('/');
    await expect.poll(() => authHeaders.length, { timeout: 15_000 }).toBeGreaterThan(0);

    expect(authHeaders.some((h) => h === 'Bearer test-access-token')).toBe(true);
  });
});
