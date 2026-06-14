import type { Locale } from './routing';

/**
 * The app uses underscore locale identifiers (`ko_KR`, `en_US`) for URL segments
 * and routing, but `Intl` / `intl-messageformat` require valid BCP-47 tags
 * (`ko-KR`, `en-US`). Use these helpers at the next-intl boundary so that
 * messages with ICU arguments / rich text format correctly, while routing keeps
 * the segment identity.
 */

/** `ko_KR` (URL segment) -> `ko-KR` (BCP-47, used by Intl formatting). */
export function toIntlLocale(locale: string): string {
  return locale.replace('_', '-');
}

/** `ko-KR` (BCP-47) -> `ko_KR` (URL segment identity used for routing/API). */
export function toSegmentLocale(locale: string): Locale {
  return locale.replace('-', '_') as Locale;
}
