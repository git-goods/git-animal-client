'use client';

import { Button } from '@gitanimals/ui-tailwind';

import { useClientSession } from '@/utils/clientAuth';
import { copyClipBoard } from '@/utils/copy';

import * as styles from './token.style';

function DevTokenPage() {
  const { data } = useClientSession();

  const accessToken = data?.user.accessToken ?? '';

  const getTokenClick = async () => {
    await copyClipBoard(accessToken);
    alert('Token copied to clipboard');
  };

  const goToAdmin = async () => {
    window.open(`${process.env.NEXT_PUBLIC_ADMIN_URL}?login/token=${accessToken}`);
  };

  return (
    <div className={styles.container}>
      <h1>Get Token Page</h1>
      <Button onClick={getTokenClick}>Get Token Click</Button>
      <Button onClick={goToAdmin}>Go to Admin</Button>
    </div>
  );
}

export default DevTokenPage;
