import { useLocale } from 'next-intl';

import { toSegmentLocale } from './locale';
import type { Locale } from './routing';

/**
 * Returns the active locale in the app's URL-segment form (`ko_KR` / `en_US`).
 *
 * next-intl's active locale is a BCP-47 tag (`ko-KR`) so that ICU message
 * formatting works, so this maps it back to the underscore segment identity that
 * routing, links and API calls rely on.
 */
export function useSegmentLocale(): Locale {
  return toSegmentLocale(useLocale());
}
