'use client';

import { type PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'styled-components';

import QueryClientProvider from '@/apis/QueryClientProvider';
import Monitoring from '@/components/Monitoring';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';

import { SnackBarProvider } from './SnackBar/SnackBarProvider';
import FeedBack from './FeedbackForm';
import SessionLoader from './SessionLoader';

function ClientProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider>
      <SessionProvider>
        <StyledComponentsRegistry>
          <Monitoring />
          <GlobalStyle />
          <SessionLoader>
            <ThemeProvider theme={theme}>
              <SnackBarProvider />
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    top: '48px',
                    right: '-12px',
                  },
                  classNames: {
                    title: 'toast-title',
                    actionButton: 'toast-action-button',
                    toast: 'toast-container',
                  },
                }}
              />

              {children}
              <FeedBack />
            </ThemeProvider>
          </SessionLoader>
        </StyledComponentsRegistry>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default ClientProvider;
