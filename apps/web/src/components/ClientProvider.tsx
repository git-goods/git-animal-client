'use client';

import type { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { ThemeProvider } from 'styled-components';

import QueryClientProvider from '@/apis/QueryClientProvider';
import Monitoring from '@/components/Monitoring';
import { MONITORING_KEY } from '@/constants/monitoring';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';

import FeedBack from './Feedback/FeedBack';
import { SnackBarProvider } from './SnackBar/SnackBarProvider';

function ClientProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider>
      <GoogleTagManager gtmId={MONITORING_KEY.GTM} />
      <SessionProvider>
        <StyledComponentsRegistry>
          <Monitoring />
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <SnackBarProvider />

            {children}
            <FeedBack />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </SessionProvider>
      <GoogleAnalytics gaId={MONITORING_KEY.GA} />
    </QueryClientProvider>
  );
}

export default ClientProvider;
