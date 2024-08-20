'use client';

import { useSearchParams } from 'next/navigation';

import LoginButton from './LoginButton';

function JWTPage(
  {
    // searchParams,
  }: {
    // searchParams: {
    //   jwt: string;
    // };
  },
) {
  // const router = useRouter();
  const searchParams = useSearchParams();
  // const { login } = useLogin();
  const jwtToken = searchParams?.get('jwt') || '';
  // const jwtToken = searchParams?.jwt || '';
  const token = jwtToken.split(' ')[1];

  // const onLogin = useCallback(
  //   async (jwtToken: string) => {
  //     const token = jwtToken.split(' ')[1];
  //     await login(token);

  //     if (await checkUsedCouponsByToken(token)) {
  //       router.replace('/mypage');
  //     } else {
  //       router.replace('/start');
  //     }
  //   },
  //   [login, router],
  // );

  // useEffect(() => {
  //   const jwtToken = searchParams?.get('jwt') || '';
  //   if (!jwtToken) return;

  //   onLogin(jwtToken as string);
  // }, [onLogin, searchParams]);

  return (
    <>
      Login Loading...
      <LoginButton token={token} />
    </>
  );
}

export default JWTPage;

// const Container = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
