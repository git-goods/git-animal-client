import { useLayoutEffect, useState } from 'react';
import { debounce } from './debounce';

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    const debouncedUpdateSize = debounce(updateSize, 250);
    window.addEventListener('resize', debouncedUpdateSize);
    updateSize(); // 초기값 설정

    return (): void => {
      window.removeEventListener('resize', debouncedUpdateSize);
      debouncedUpdateSize.cancel();
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
