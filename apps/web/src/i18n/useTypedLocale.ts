import { useLocale } from 'next-intl';

import type { Locale } from './routing';

export function useTypedLocale(): Locale {
  return useLocale() as Locale;
}
