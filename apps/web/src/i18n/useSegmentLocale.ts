import { useLocale } from 'next-intl';

import type { ApiLocale } from './locale';
import { toSegmentLocale } from './locale';

// 백엔드 API 경계에서만 쓴다. 네비게이션·UI 는 useTypedLocale.
export function useSegmentLocale(): ApiLocale {
  return toSegmentLocale(useLocale());
}
