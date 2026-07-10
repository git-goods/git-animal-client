'use client';

import { type PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import { domMax, LazyMotion } from 'framer-motion';
import { OverlayProvider } from 'overlay-kit';

import { registerInterceptors } from '@/apis/interceptor';
import QueryClientProvider from '@/apis/QueryClientProvider';
import Monitoring from '@/components/Global/Monitoring';

import SessionLoader from './SessionLoader';

// Registers auth interceptors on the client bundle. The server root layout
// module does not run in the browser, so this is the client-side entry point.
registerInterceptors();

function ClientProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider>
      <LazyMotion features={domMax}>
        <SessionProvider>
          <Monitoring />
          <SessionLoader>
            <OverlayProvider>{children}</OverlayProvider>
          </SessionLoader>
        </SessionProvider>
      </LazyMotion>
    </QueryClientProvider>
  );
}

export default ClientProvider;
