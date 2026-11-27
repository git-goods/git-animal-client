'use client';

import { type PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import { domMax, LazyMotion } from 'framer-motion';
import { OverlayProvider } from 'overlay-kit';

import { registerInterceptors } from '@/apis/interceptor';
import QueryClientProvider from '@/apis/QueryClientProvider';
import Monitoring from '@/components/Global/Monitoring';

import SessionLoader from './SessionLoader';

// server root layout 모듈은 브라우저에서 돌지 않아 클라이언트 인터셉터는 여기서 등록한다.
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
