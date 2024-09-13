'use client';

import { type PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

import QueryClientProvider from '@/apis/QueryClientProvider';
import Monitoring from '@/components/Monitoring';

import SessionLoader from './SessionLoader';

function ClientProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider>
      <SessionProvider>
        <Monitoring />
        <SessionLoader>{children}</SessionLoader>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default ClientProvider;
