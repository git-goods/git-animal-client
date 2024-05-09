import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { checkUsedCouponsByToken } from '@/apis/user/getUsedCoupons';
import { useLogin } from '@/store/user';

function JWTPage() {
  const router = useRouter();
  const { query } = router;
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
    [login, router],
  );

  useEffect(() => {
    const jwtToken = query.jwt;
    if (!jwtToken) return;

    onLogin(jwtToken as string);
  }, [onLogin, query.jwt, router]);

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
