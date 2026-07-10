'use client';

import { useSession } from 'next-auth/react';

const SessionLoader = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  if (session.status === 'loading') {
    return <div className="loading" />;
  }

  return <>{children}</>;
};

export default SessionLoader;
