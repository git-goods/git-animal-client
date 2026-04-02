'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';

import { config, MONITORING_KEY } from '@/shared/config/config';
import { isProd } from '@/shared/config/env';
import { usePathname } from '@/shared/i18n/routing';
import { initAnalytics, trackPageView } from '@/shared/lib/analytics';

function Monitoring() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const url = pathname + searchParams.toString();
    trackPageView(url);
  }, [pathname, searchParams]);

  if (!isProd) return <></>;

  return (
    <>
      <GoogleAnalytics gaId={config.monitoring.GA} />
      <GoogleTagManager gtmId={config.monitoring.GTM} />
      <Analytics />

      <Script
        strategy="afterInteractive"
        src={`https://d-collect.jennifersoft.com/${MONITORING_KEY.JENNIFER}/demian.js`}
      />
      <Script
        id="jennifer-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                (function(j,ennifer) {
                    j['dmndata']=[];j['jenniferFront']=function(args){window.dmndata.push(args)};
                    j['dmnaid']=ennifer;j['dmnatime']=new Date();j['dmnanocookie']=false;j['dmnajennifer']='JENNIFER_FRONT@INTG';
                }(window, '${config.monitoring.JENNIFER}'));
      `,
        }}
      />
    </>
  );
}

export default Monitoring;
