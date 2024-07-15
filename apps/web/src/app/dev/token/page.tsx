'use client';

import { Button } from '@gitanimals/ui-panda';

import { getToken } from '@/store/user';
import { copyClipBoard } from '@/utils/copy';
import { useDevAccess } from '@/utils/dev';

import * as styles from './token.style';

function DevTokenPage() {
  const { isDevAccessPossible } = useDevAccess();

  if (!isDevAccessPossible) {
    return <div>Not allowed</div>;
  }

  const getTokenClick = async () => {
    const accessToken = getToken();

    await copyClipBoard(accessToken);
    alert('Token copied to clipboard');
  };

  const goToAdmin = async () => {
    const accessToken = getToken();

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
