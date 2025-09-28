'use client';

import { type PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import { domMax, LazyMotion } from 'framer-motion';
import { OverlayProvider } from 'overlay-kit';

import QueryClientProvider from '@/apis/QueryClientProvider';
import Monitoring from '@/components/Global/Monitoring';

import SessionLoader from './SessionLoader';

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
