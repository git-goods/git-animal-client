import { describe, expect, test } from 'vitest';

import { getToggledLocale, LOCALE, LOCALE_LIST, routing } from './routing';

describe('routing config (BCP-47)', () => {
  test('locales are valid BCP-47 hyphen tags', () => {
    expect(LOCALE_LIST).toEqual(['en-US', 'ko-KR']);
    expect(routing.locales).toEqual(['en-US', 'ko-KR']);
    expect(routing.defaultLocale).toBe('en-US');
    // Each locale must be accepted by Intl (the reason for the migration).
    for (const locale of routing.locales) {
      expect(() => Intl.getCanonicalLocales(locale)).not.toThrow();
    }
  });

  test('localePrefix has no custom prefixes mapping (identity === URL segment)', () => {
    // The old underscore-era `prefixes` hack is gone; default `/{locale}` applies.
    const localePrefix = routing.localePrefix as unknown;
    const prefixes =
      typeof localePrefix === 'object' && localePrefix !== null
        ? (localePrefix as { prefixes?: unknown }).prefixes
        : undefined;
    expect(prefixes).toBeUndefined();
  });

  test('getToggledLocale flips between the two locales (both directions)', () => {
    expect(getToggledLocale(LOCALE.EN_US)).toBe(LOCALE.KO_KR);
    expect(getToggledLocale(LOCALE.KO_KR)).toBe(LOCALE.EN_US);
    expect(getToggledLocale('en-US')).toBe('ko-KR');
    expect(getToggledLocale('ko-KR')).toBe('en-US');
  });
});
