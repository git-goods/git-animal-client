'use client';

import { useSession } from 'next-auth/react';
import { setInstanceToken } from '@gitanimals/api';

const SessionLoader = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  if (session.status === 'loading') {
    return <div className="loading" />;
  }

  if (session.status === 'authenticated') {
    // setAPIInstantToken(`Bearer ${session.data.user.accessToken}`);
    setInstanceToken(`Bearer ${session.data.user.accessToken}`);
  }

  return <>{children}</>;
};

export default SessionLoader;
