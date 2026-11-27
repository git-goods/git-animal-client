import { toSegmentLocale } from './locale';
import { LOCALE_LIST } from './routing';

const LEGACY_LOCALE_PREFIX: Record<string, string> = Object.fromEntries(
  LOCALE_LIST.map((locale) => [`/${toSegmentLocale(locale)}`, `/${locale}`]),
);

// 세그먼트 단위로만 매칭해 /en_USx 는 리다이렉트하지 않는다.
export function resolveLegacyLocalePath(pathname: string): string | null {
  for (const [legacy, standard] of Object.entries(LEGACY_LOCALE_PREFIX)) {
    if (pathname === legacy || pathname.startsWith(`${legacy}/`)) {
      return standard + pathname.slice(legacy.length);
    }
  }
  return null;
}
