import { describe, expect, test } from 'vitest';

import { toIntlLocale, toSegmentLocale } from './locale';

describe('locale helpers', () => {
  test('toIntlLocale converts underscore segment locale to BCP-47', () => {
    expect(toIntlLocale('ko_KR')).toBe('ko-KR');
    expect(toIntlLocale('en_US')).toBe('en-US');
  });

  test('toIntlLocale output is a valid BCP-47 tag (the actual bug)', () => {
    // The underscore form is what breaks intl-messageformat at runtime.
    expect(() => Intl.getCanonicalLocales('ko_KR')).toThrow(RangeError);
    // The converted form must be accepted by Intl.
    expect(() => Intl.getCanonicalLocales(toIntlLocale('ko_KR'))).not.toThrow();
    expect(() => Intl.getCanonicalLocales(toIntlLocale('en_US'))).not.toThrow();
  });

  test('toSegmentLocale converts BCP-47 back to underscore segment locale', () => {
    expect(toSegmentLocale('ko-KR')).toBe('ko_KR');
    expect(toSegmentLocale('en-US')).toBe('en_US');
  });

  test('round-trips between segment and intl forms', () => {
    expect(toSegmentLocale(toIntlLocale('ko_KR'))).toBe('ko_KR');
    expect(toSegmentLocale(toIntlLocale('en_US'))).toBe('en_US');
  });
});
