import { LOCALE, type Locale } from './routing';

// 나라·언어를 추가할 때는 routing 의 LOCALE 에 언어를 넣고 여기에 ISO 3166-1 국가 코드를 붙인다.
const COUNTRY_LOCALE: Record<string, Locale> = {
  KR: LOCALE.KO_KR,
};

export const getCountryLocale = (country: string | null): Locale | undefined =>
  country ? COUNTRY_LOCALE[country.toUpperCase()] : undefined;
