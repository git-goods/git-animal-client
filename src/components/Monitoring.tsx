import Script from 'next/script';

const GA_KEY = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? 'G-RNEDVMFT5X';
const JENNIFER_KEY = 'e9e023ee';
function Monitoring() {
  if (process.env.NODE_ENV !== 'production') return <></>;

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_KEY}`} />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_KEY}', {
              page_path: window.location.pathname,
            });
      `,
        }}
      />

      <Script strategy="afterInteractive" src={`https://d-collect.jennifersoft.com/${JENNIFER_KEY}/demian.js`} />
      <Script
        id="jennifer-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                (function(j,ennifer) {
                    j['dmndata']=[];j['jenniferFront']=function(args){window.dmndata.push(args)};
                    j['dmnaid']=ennifer;j['dmnatime']=new Date();j['dmnanocookie']=false;j['dmnajennifer']='JENNIFER_FRONT@INTG';
                }(window, '${JENNIFER_KEY}'));
      `,
        }}
      />
    </>
  );
}

export default Monitoring;
