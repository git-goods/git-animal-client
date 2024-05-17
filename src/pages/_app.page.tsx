import type { AppProps } from 'next/app';
import Script from 'next/script';
import { domAnimation, LazyMotion } from 'framer-motion';
import { ThemeProvider } from 'styled-components';

import QueryClientProvider from '@/apis/QueryClientProvider';
import { SnackBarProvider } from '@/components/SnackBar/SnackBarProvider';
import usePageTrack from '@/hooks/event/usePageTrack';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';

const GA_KEY = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? 'G-RNEDVMFT5X';

export default function App({ Component, pageProps }: AppProps) {
  usePageTrack();
  return (
    <QueryClientProvider>
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

      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <LazyMotion features={domAnimation}>
          <SnackBarProvider />
          <Component {...pageProps} />
        </LazyMotion>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
