'use client';

import { type PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import { domMax, LazyMotion } from 'framer-motion';

import QueryClientProvider from '@/apis/QueryClientProvider';
import Monitoring from '@/components/Global/Monitoring';

import SessionLoader from '../SessionLoader';

function ClientProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider>
      <LazyMotion features={domMax}>
        <SessionProvider>
          <Monitoring />
          <SessionLoader>{children}</SessionLoader>
        </SessionProvider>
      </LazyMotion>
    </QueryClientProvider>
  );
}

export default ClientProvider;
