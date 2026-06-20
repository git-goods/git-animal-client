import { useLocale } from 'next-intl';

import type { Locale } from './routing';

/**
 * Returns the active locale typed as the app's `Locale` union (BCP-47, e.g.
 * `en-US`). next-intl's `useLocale()` is typed `string`; this narrows it for
 * routing/navigation APIs that expect a `Locale`. Use this for navigation and
 * locale-keyed UI; use `useSegmentLocale` only at the backend API boundary.
 */
export function useTypedLocale(): Locale {
  return useLocale() as Locale;
}
