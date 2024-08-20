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
  const searchParams = useSearchParams();
  const jwtToken = searchParams?.get('jwt') || '';
  const token = jwtToken.split(' ')[1];

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
