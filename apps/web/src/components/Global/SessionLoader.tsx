'use client';

import { useSession } from 'next-auth/react';
import { setRequestInterceptor, setResponseInterceptor } from '@gitanimals/api';
import { setRenderRequestInterceptor, setRenderResponseInterceptor } from '@gitanimals/api/src/_instance';

import {
  interceptorRequestFulfilled,
  interceptorResponseFulfilled,
  interceptorResponseRejected,
} from '@/apis/interceptor';

const SessionLoader = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  if (session.status === 'loading') {
    return <div className="loading" />;
  }

  if (session.status === 'authenticated') {
    setRequestInterceptor(interceptorRequestFulfilled);
    setResponseInterceptor(interceptorResponseFulfilled, interceptorResponseRejected);
    setRenderRequestInterceptor(interceptorRequestFulfilled);
    setRenderResponseInterceptor(interceptorResponseFulfilled, interceptorResponseRejected);
  }

  return <>{children}</>;
};

export default SessionLoader;
