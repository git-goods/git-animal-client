'use client';

import Script from 'next/script';

const isProd = process.env.NODE_ENV === 'production';

const MONITORING_KEY = {
  GA: isProd ? 'G-RNEDVMFT5X' : 'G-N45935GS2S',
  GTM: 'GTM-T6DQHP7X',
  JENNIFER: isProd ? 'e9e023ee' : '000000',
};

function Monitoring() {
  return (
    <>
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
