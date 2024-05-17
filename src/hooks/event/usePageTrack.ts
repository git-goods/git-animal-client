import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { pageview } from '@/lib/gtag';
import { isProd } from '@/utils/common';

const usePageTrack = () => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (!isProd(process.env.NODE_ENV)) return;

      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};

export default usePageTrack;
