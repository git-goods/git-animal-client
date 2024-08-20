'use client';

import type { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'styled-components';

import QueryClientProvider from '@/apis/QueryClientProvider';
import Monitoring from '@/components/Monitoring';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';

import { SnackBarProvider } from './SnackBar/SnackBarProvider';

function ClientProvider({ children }: PropsWithChildren) {
  console.log('ClientProvider: ');
  return (
    <QueryClientProvider>
      <SessionProvider>
        <StyledComponentsRegistry>
          <Monitoring />
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <SnackBarProvider />

            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default ClientProvider;
