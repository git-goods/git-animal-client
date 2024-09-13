'use client';

import { useSession } from 'next-auth/react';
import { setRequestInterceptor } from '@gitanimals/api';

import { interceptorRequestFulfilled } from '@/apis/interceptor';

const SessionLoader = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  if (session.status === 'loading') {
    return <div className="loading" />;
  }

  if (session.status === 'authenticated') {
    setRequestInterceptor(interceptorRequestFulfilled);
  }

  return <>{children}</>;
};

export default SessionLoader;
