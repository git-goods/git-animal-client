'use client';

import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import router from 'next/router';
import styled from 'styled-components';

import { checkUsedCouponsByToken } from '@/apis/user/getUsedCoupons';
import { useLogin } from '@/store/user';

function JWTPage() {
  const searchParams = useSearchParams();
  const { login } = useLogin();

  const onLogin = useCallback(
    async (jwtToken: string) => {
      const token = jwtToken.split(' ')[1];
      await login(token);

      if (await checkUsedCouponsByToken(token)) {
        router.replace('/mypage');
      } else {
        router.replace('/start');
      }
    },
    [login],
  );

  useEffect(() => {
    const jwtToken = searchParams?.get('jwt') || '';
    if (!jwtToken) return;

    onLogin(jwtToken as string);
  }, [onLogin, searchParams]);

  return <Container>Login Loading...</Container>;
}

export default JWTPage;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;
`;
