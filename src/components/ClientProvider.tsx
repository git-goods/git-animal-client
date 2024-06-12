'use client';

import type { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

import QueryClientProvider from '@/apis/QueryClientProvider';
import Monitoring from '@/components/Monitoring';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';

function ClientProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider>
      <StyledComponentsRegistry>
        <Monitoring />
        <GlobalStyle />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>;
      </StyledComponentsRegistry>
    </QueryClientProvider>
  );
}

export default ClientProvider;
