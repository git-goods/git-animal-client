'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useLogin } from '@/store/user';

function DevLocalLoginPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const router = useRouter();
  const { login } = useLogin();

  const onLogin = async (token: string) => {
    try {
      await login(token);
      router.replace('/mypage');
    } catch (error) {
      router.replace('/');
    }
  };

  useEffect(() => {
    if (token) {
      onLogin(token);
    }
  }, [token]);

  return <div>Loading...</div>;
}

export default DevLocalLoginPage;
