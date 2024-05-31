import type { AppProps } from 'next/app';
import { domAnimation, LazyMotion } from 'framer-motion';
import { ThemeProvider } from 'styled-components';

import QueryClientProvider from '@/apis/QueryClientProvider';
import LoadingProvider from '@/components/Loading/LoadingProvider';
import Monitoring from '@/components/Monitoring';
import { SnackBarProvider } from '@/components/SnackBar/SnackBarProvider';
import usePageTrack from '@/hooks/event/usePageTrack';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  usePageTrack();
  return (
    <QueryClientProvider>
      <Monitoring />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <LazyMotion features={domAnimation}>
          <SnackBarProvider />
          <LoadingProvider />
          <Component {...pageProps} />
        </LazyMotion>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
