'use client';

import { type PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'styled-components';

import QueryClientProvider from '@/apis/QueryClientProvider';
import Monitoring from '@/components/Monitoring';
import StyledComponentsRegistry from '@/lib/registry';
import theme from '@/styles/theme';

import SessionLoader from './SessionLoader';

function ClientProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider>
      <SessionProvider>
        <StyledComponentsRegistry>
          <Monitoring />
          <SessionLoader>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </SessionLoader>
        </StyledComponentsRegistry>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default ClientProvider;
