import { getToggledLocale, usePathname, useRouter } from './routing';
import { useSegmentLocale } from './useSegmentLocale';

const useToggleLocale = () => {
  const router = useRouter();
  const locale = useSegmentLocale();
  const pathname = usePathname();

  const toggleLocale = () => {
    const toggledLocale = getToggledLocale(locale);
    router.push(pathname, { locale: toggledLocale });
  };

  return { toggleLocale };
};

export default useToggleLocale;
