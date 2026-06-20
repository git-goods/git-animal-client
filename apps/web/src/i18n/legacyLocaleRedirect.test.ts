import { describe, expect, test } from 'vitest';

import { resolveLegacyLocalePath } from './legacyLocaleRedirect';

describe('resolveLegacyLocalePath (308 backward-compat mapping)', () => {
  test('maps legacy underscore prefixes to standard hyphen prefixes', () => {
    expect(resolveLegacyLocalePath('/en_US')).toBe('/en-US');
    expect(resolveLegacyLocalePath('/ko_KR')).toBe('/ko-KR');
    expect(resolveLegacyLocalePath('/en_US/mypage')).toBe('/en-US/mypage');
    expect(resolveLegacyLocalePath('/ko_KR/game/quiz/solve')).toBe('/ko-KR/game/quiz/solve');
  });

  test('preserves the full sub-path (query is handled by the caller via clone)', () => {
    expect(resolveLegacyLocalePath('/en_US/guild/detail/123/join')).toBe('/en-US/guild/detail/123/join');
  });

  test('returns null for already-standard hyphen paths (no redirect loop)', () => {
    expect(resolveLegacyLocalePath('/en-US')).toBeNull();
    expect(resolveLegacyLocalePath('/en-US/mypage')).toBeNull();
    expect(resolveLegacyLocalePath('/ko-KR/shop')).toBeNull();
  });

  test('returns null for non-locale and lookalike paths (anchored to full segment)', () => {
    expect(resolveLegacyLocalePath('/about')).toBeNull();
    expect(resolveLegacyLocalePath('/')).toBeNull();
    expect(resolveLegacyLocalePath('/en_USx')).toBeNull(); // not a segment boundary
    expect(resolveLegacyLocalePath('/foo/en_US/bar')).toBeNull(); // only matches a leading prefix
  });
});
