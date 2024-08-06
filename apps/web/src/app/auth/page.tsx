import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from '@gitanimals/ui-panda';

import * as styles from './form.style';

function JWTPage({ searchParams }: { searchParams: Record<string, string> }) {
  const jwt = searchParams['jwt'] || '';

  if (!jwt) {
    console.log('jwtToken is empty');
    return redirect('/');
  }

  const jwtToken = jwt.split(' ')[1];

  const handleLogin = async () => {
    'use server';

    cookies().set('@gitanimals/auth-token', jwtToken, {
      maxAge: 48 * 60 * 60,
    });

    return redirect('/mypage');

    // TODO: coupons 사용 여부 확인 후 페이지 이동
    // if (await getUsedCouponsByToken(jwtToken)) {
    //   return redirect('/mypage');
    // } else {
    //   return redirect('/start');
    // }
  };
  // form 자동 제출

  return (
    <div className={styles.container}>
      <form action={handleLogin} className={styles.form}>
        <h1 className={styles.heading}>Successfully logged in!</h1>
        <Button>Go Next Page</Button>
      </form>
    </div>
  );
}

export default JWTPage;
