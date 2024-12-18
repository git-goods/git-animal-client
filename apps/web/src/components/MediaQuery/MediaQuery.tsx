'use client';

import { useEffect, useState } from 'react';
import { mediaBreakpoints } from '@gitanimals/ui-panda';

interface MediaQueryProps {
  mobile: React.ReactNode | null;
  desktop: React.ReactNode | null;
}

export function MediaQuery({ mobile, desktop }: MediaQueryProps) {
  const isMobile = useMediaQuery(`(max-width: ${mediaBreakpoints.mobile}px)`);

  return isMobile ? mobile : desktop;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', listener);

    return () => mediaQuery.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
