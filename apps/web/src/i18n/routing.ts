import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const LOCALE = {
  EN_US: 'en_US',
  KO_KR: 'ko_KR',
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
});

export type Locale = (typeof routing.locales)[number];

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing);
