'use client';

import { type PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'styled-components';

import QueryClientProvider from '@/apis/QueryClientProvider';
import Monitoring from '@/components/Monitoring';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';

import FeedBack from './Feedback/FeedBack';
import SessionLoader from './SessionLoader';

function ClientProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider>
      {/* <GoogleTagManager gtmId={MONITORING_KEY.GTM} /> */}
      <SessionProvider>
        <StyledComponentsRegistry>
          <Monitoring />
          <GlobalStyle />
          <SessionLoader>
            <ThemeProvider theme={theme}>
              {/* <SnackBarProvider /> */}

              {children}
              <FeedBack />
            </ThemeProvider>
          </SessionLoader>
        </StyledComponentsRegistry>
      </SessionProvider>
      {/* <GoogleAnalytics gaId={MONITORING_KEY.GA} /> */}
    </QueryClientProvider>
  );
}

export default ClientProvider;
