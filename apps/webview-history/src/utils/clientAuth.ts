'use client';

import { useSession } from 'next-auth/react';

const initUser = {
  id: '',
  email: '',
  name: '',
  image: '',
};

export const useClientSession = () => {
  const session = useSession();
  return session;
};

export const useClientUser = () => {
  const session = useSession();
  return session?.data?.user ?? initUser;
};
