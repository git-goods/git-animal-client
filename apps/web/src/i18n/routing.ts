import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

// URL 은 BCP-47(en-US). 레거시 /en_US 는 middleware 가 308 로 넘긴다.
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

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing);
