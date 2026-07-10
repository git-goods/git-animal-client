import { useLocale } from 'next-intl';

import type { ApiLocale } from './locale';
import { toSegmentLocale } from './locale';

/**
 * Returns the active locale in the backend API's underscore form (`en_US` /
 * `ko_KR`). Use this ONLY at the backend API boundary.
 *
 * next-intl's active locale is a BCP-47 tag (`en-US`); this maps it to the
 * underscore wire form the API contract requires. For navigation or locale-keyed
 * UI, use `useTypedLocale` (which keeps the hyphen `Locale`) instead.
 */
export function useSegmentLocale(): ApiLocale {
  return toSegmentLocale(useLocale());
}
