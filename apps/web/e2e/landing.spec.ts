import { expect, test } from '@playwright/test';

import { stubGitanimalsApi } from './utils/api-stub';

/**
 * Covers the query-relocation change: the landing stat counts (moved from
 * app-local queries.ts into @gitanimals/react-query) must still render, and the
 * seasonal spring content + relocated Footer must still be present.
 */
test.describe('landing page', () => {
  test('renders shell, seasonal content and Footer', async ({ page }) => {
    await stubGitanimalsApi(page);
    await page.goto('/');

    // Shell renders regardless of the ErrorBoundary'd server sections (ranking).
    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible(); // <footer> (relocated to components/Footer)
  });

  test('renders stat counts from relocated queryOptions factories', async ({ page }) => {
    await stubGitanimalsApi(page);
    await page.goto('/');

    // auctionQueries.totalProductCountOptions → { count: '1234' } → "1234+"
    await expect(page.getByText('1234+')).toBeVisible();
    // renderStatsQueries.totalPersonaCountOptions → { personaCount: '42' } → "42+"
    await expect(page.getByText('42+')).toBeVisible();
    // TotalUsers = identity.userCount(5678) + render.userCount(5678) = 11356
    await expect(page.getByText('11356+')).toBeVisible();
  });
});
