import type { Page, Request } from '@playwright/test';

// Next SSR fetch 는 node 에서 돌아 여기서 가로챌 수 없다 — 브라우저 요청만 스텁한다.
// 응답 모양은 @gitanimals/api zod 스키마와 같아야 safeGet 검증을 통과하고 Suspense 가 풀린다.
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
