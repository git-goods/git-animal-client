'use client';

// SessionLoader.tsx
import { useSession } from 'next-auth/react';
import { setInstanceToken } from '@gitanimals/api';

import { setAPIInstantToken } from '@/apis';

const SessionLoader = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  if (session.status === 'loading') {
    return <div className="loading" />;
  }

  if (session.status === 'authenticated') {
    console.log('session.data.user.accessToken: ', session.data.user.accessToken);
    setAPIInstantToken(`Bearer ${session.data.user.accessToken}`);
    setInstanceToken(`Bearer ${session.data.user.accessToken}`);
  }

  return <>{children}</>;
};

export default SessionLoader;
