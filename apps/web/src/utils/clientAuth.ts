'use client';

import { useSession } from 'next-auth/react';

export const useClientSession = () => {
  return useSession();
};
