import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

// The app uses BCP-47 locale identifiers (`en-US`, `ko-KR`) everywhere:
// URL segments, `useLocale()`, message filenames, and SEO. The backend API
// expects the underscore form (`en_US`, `ko_KR`); conversion happens only at the
// API boundary via `toSegmentLocale`/`useSegmentLocale`. Legacy underscore URLs
// (`/en_US`) are 308-redirected to the hyphen form by the middleware.
export const LOCALE = {
  EN_US: 'en-US',
  KO_KR: 'ko-KR',
} as const;

export const LOCALE_LIST = [LOCALE.EN_US, LOCALE.KO_KR] as const;
export const DEFAULT_LOCALE = LOCALE.EN_US;

export const getToggledLocale = (locale: Locale) => {
  return locale === LOCALE.EN_US ? LOCALE.KO_KR : LOCALE.EN_US;
};

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LOCALE_LIST,

  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,

  // Locale identity now equals the URL segment (both BCP-47), so the default
  // `/{locale}` prefixing is correct — no `prefixes` mapping needed.
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing);
