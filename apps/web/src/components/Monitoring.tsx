'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

import { isProd } from '@/constants/env';
import { MONITORING_KEY } from '@/constants/monitoring';
import { initAnalytics, trackPageView } from '@/lib/analytics';

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
      <GoogleAnalytics gaId={MONITORING_KEY.GA} />
      <GoogleTagManager gtmId={MONITORING_KEY.GTM} />

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
                }(window, '${MONITORING_KEY.JENNIFER}'));
      `,
        }}
      />
    </>
  );
}

export default Monitoring;
