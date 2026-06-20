import { describe, expect, test } from 'vitest';

import { toIntlLocale } from './locale';
import { LOCALE, routing } from './routing';

describe('routing locale prefixes', () => {
  // Regression: next-intl resolves the active locale to the BCP-47 form (`en-US`)
  // on the client (via `useLocale()`), while the URL segments / middleware / API
  // use the underscore form (`en_US`). Without a `localePrefix.prefixes` mapping,
  // client navigation (`redirect`/`Link`) prefixes paths with `/en-US`, which the
  // middleware does not recognize and re-prefixes with the default locale,
  // producing `/en_US/en-US/...` -> 404.
  //
  // The fix maps the BCP-47 locale identity back to the underscore URL prefix.
  test('maps BCP-47 locale identities to underscore URL prefixes', () => {
    const prefixes = (routing.localePrefix as { prefixes?: Record<string, string> }).prefixes;
    expect(prefixes).toBeDefined();
    expect(prefixes?.[toIntlLocale(LOCALE.EN_US)]).toBe(`/${LOCALE.EN_US}`);
    expect(prefixes?.[toIntlLocale(LOCALE.KO_KR)]).toBe(`/${LOCALE.KO_KR}`);
  });
});
