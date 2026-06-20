import { describe, expect, test } from 'vitest';

import { toIntlLocale, toSegmentLocale } from './locale';

describe('locale boundary converters', () => {
  test('toSegmentLocale converts BCP-47 -> underscore API wire form', () => {
    expect(toSegmentLocale('ko-KR')).toBe('ko_KR');
    expect(toSegmentLocale('en-US')).toBe('en_US');
  });

  test('BCP-47 locales are accepted by Intl; underscore form is not (the original bug)', () => {
    // The underscore wire form is invalid for intl-messageformat at runtime.
    expect(() => Intl.getCanonicalLocales('ko_KR')).toThrow(RangeError);
    // The hyphen form the app uses everywhere is accepted by Intl.
    expect(() => Intl.getCanonicalLocales('ko-KR')).not.toThrow();
    expect(() => Intl.getCanonicalLocales('en-US')).not.toThrow();
  });

  test('toIntlLocale converts underscore -> BCP-47 (inverse of toSegmentLocale)', () => {
    expect(toIntlLocale('ko_KR')).toBe('ko-KR');
    expect(toIntlLocale('en_US')).toBe('en-US');
  });

  test('round-trips between BCP-47 and API wire forms', () => {
    expect(toIntlLocale(toSegmentLocale('ko-KR'))).toBe('ko-KR');
    expect(toIntlLocale(toSegmentLocale('en-US'))).toBe('en-US');
  });
});
