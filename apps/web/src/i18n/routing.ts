import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { toIntlLocale } from './locale';

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

  // next-intl resolves the active locale to its BCP-47 form (`en-US`) on the
  // client (see `request.ts` -> `toIntlLocale`), but URL segments / middleware /
  // API all use the underscore form (`en_US`). Map the BCP-47 locale identity
  // back to the underscore URL prefix so client navigation (`redirect`/`Link`)
  // emits `/en_US/...` instead of `/en-US/...` (which the middleware re-prefixes
  // into `/en_US/en-US/...` -> 404).
  localePrefix: {
    mode: 'always',
    prefixes: {
      [toIntlLocale(LOCALE.EN_US)]: `/${LOCALE.EN_US}`,
      [toIntlLocale(LOCALE.KO_KR)]: `/${LOCALE.KO_KR}`,
    },
  },
});

export type Locale = (typeof routing.locales)[number];

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing);
