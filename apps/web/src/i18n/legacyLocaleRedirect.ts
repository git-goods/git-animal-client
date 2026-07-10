import { toSegmentLocale } from './locale';
import { LOCALE_LIST } from './routing';

// Legacy underscore locale prefix -> standard hyphen prefix (backward compat).
// e.g. '/en_US' -> '/en-US'. Derived from the canonical hyphen locales so it
// stays in sync if locales change.
const LEGACY_LOCALE_PREFIX: Record<string, string> = Object.fromEntries(
  LOCALE_LIST.map((locale) => [`/${toSegmentLocale(locale)}`, `/${locale}`]),
);

/**
 * Maps a legacy underscore-locale pathname to its standard hyphen form,
 * preserving the rest of the path. Returns `null` when no legacy prefix matches.
 *
 * Anchored to a full path segment, so `/en_USx` does NOT match.
 * e.g. `/en_US/mypage` -> `/en-US/mypage`; `/en-US/x` -> null; `/about` -> null.
 */
export function resolveLegacyLocalePath(pathname: string): string | null {
  for (const [legacy, standard] of Object.entries(LEGACY_LOCALE_PREFIX)) {
    if (pathname === legacy || pathname.startsWith(`${legacy}/`)) {
      return standard + pathname.slice(legacy.length);
    }
  }
  return null;
}
