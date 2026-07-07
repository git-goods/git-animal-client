import type { Page, Request } from '@playwright/test';

/**
 * Stubs the CLIENT-side gitanimals API/render calls the landing page fires
 * (browser-initiated only — Next SSR fetches run in node and are NOT
 * interceptable here). Shapes match the zod schemas in @gitanimals/api so
 * safeGet validation passes and Suspense settles deterministically.
 *
 * Returns a live list of the auth headers seen on intercepted requests, so a
 * test can assert what the API interceptor attached (Bearer token or nothing).
 */
export async function stubGitanimalsApi(page: Page): Promise<{ authHeaders: (string | undefined)[] }> {
  const authHeaders: (string | undefined)[] = [];

  const body = (req: Request): unknown => {
    const url = req.url();
    // api.gitanimals.org
    if (url.includes('/auctions/statistics/products/total')) return { count: '1234' };
    // both api (identity) and render expose /users/statistics/total
    if (url.includes('/users/statistics/total')) return { userCount: '5678' };
    // render.gitanimals.org
    if (url.includes('/personas/statistics/total')) return { personaCount: '42' };
    if (url.includes('/personas/infos')) {
      return {
        personas: [
          { type: 'CAT', dropRate: '1.2%', grade: 'DEFAULT' },
          { type: 'DOG', dropRate: '3.4%', grade: 'DEFAULT' },
        ],
      };
    }
    // Anything else the client happens to call: benign empty object.
    return {};
  };

  await page.route(/https?:\/\/(api|render)\.gitanimals\.org\//, async (route) => {
    authHeaders.push(route.request().headers()['authorization']);
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(body(route.request())),
    });
  });

  return { authHeaders };
}
