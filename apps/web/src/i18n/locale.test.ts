// Run: node --experimental-strip-types --test apps/web/src/i18n/locale.test.ts
import test from 'node:test';
import assert from 'node:assert/strict';

import { toIntlLocale, toSegmentLocale } from './locale.ts';

test('toIntlLocale converts underscore segment locale to BCP-47', () => {
  assert.equal(toIntlLocale('ko_KR'), 'ko-KR');
  assert.equal(toIntlLocale('en_US'), 'en-US');
});

test('toIntlLocale output is a valid BCP-47 tag (the actual bug)', () => {
  // The underscore form is what breaks intl-messageformat at runtime.
  assert.throws(() => Intl.getCanonicalLocales('ko_KR'), RangeError);
  // The converted form must be accepted by Intl.
  assert.doesNotThrow(() => Intl.getCanonicalLocales(toIntlLocale('ko_KR')));
  assert.doesNotThrow(() => Intl.getCanonicalLocales(toIntlLocale('en_US')));
});

test('toSegmentLocale converts BCP-47 back to underscore segment locale', () => {
  assert.equal(toSegmentLocale('ko-KR'), 'ko_KR');
  assert.equal(toSegmentLocale('en-US'), 'en_US');
});

test('round-trips between segment and intl forms', () => {
  assert.equal(toSegmentLocale(toIntlLocale('ko_KR')), 'ko_KR');
  assert.equal(toSegmentLocale(toIntlLocale('en_US')), 'en_US');
});
