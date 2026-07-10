import { getToggledLocale, usePathname, useRouter } from './routing';
import { useTypedLocale } from './useTypedLocale';

const useToggleLocale = () => {
  const router = useRouter();
  const locale = useTypedLocale();
  const pathname = usePathname();

  const toggleLocale = () => {
    const toggledLocale = getToggledLocale(locale);
    router.push(pathname, { locale: toggledLocale });
  };

  return { toggleLocale };
};

export default useToggleLocale;
