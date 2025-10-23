import { useLocale } from 'next-intl';

import type { Locale } from './routing';
import { getToggledLocale, usePathname, useRouter } from './routing';

const useToggleLocale = () => {
  const router = useRouter();
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  const toggleLocale = () => {
    const toggledLocale = getToggledLocale(locale);
    router.push(pathname, { locale: toggledLocale });
  };

  return { toggleLocale };
};

export default useToggleLocale;
