/**
 * The app uses BCP-47 locale identifiers (`en-US`, `ko-KR`) everywhere — URL
 * segments, routing, `useLocale()`, message filenames, SEO. The backend API
 * wire contract instead requires the underscore form (`en_US`, `ko_KR`). These
 * helpers convert between the two; conversion to `ApiLocale` must happen only at
 * the backend API boundary.
 */

/** Underscore locale form required by the backend API wire contract. */
export type ApiLocale = 'en_US' | 'ko_KR';

/** `en_US` (legacy/underscore) -> `en-US` (BCP-47). */
export function toIntlLocale(locale: string): string {
  return locale.replace('_', '-');
}

/** `en-US` (BCP-47) -> `en_US` (underscore API wire form). */
export function toSegmentLocale(locale: string): ApiLocale {
  return locale.replace('-', '_') as ApiLocale;
}
