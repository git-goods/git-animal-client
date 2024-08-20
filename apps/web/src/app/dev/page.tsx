'use client';

import Link from 'next/link';
import { Box } from '_panda/jsx';
import { flex } from '_panda/patterns';
import { Button } from '@gitanimals/ui-panda';

import { useClientSession } from '@/utils/clientAuth';
import { getIsOnLoadSheet, sendLog } from '@/utils/log';

function DevPage() {
  const { data: session, status } = useClientSession();
  return (
    <Box p={32}>
      <h1>Dev list </h1>
      <ul className={listStyle}>
        <li>client session status : {status}</li>
        <li>
          client session user : <br /> {session?.user && JSON.stringify(session.user)}
        </li>
        <li>
          <Link href="/dev/token">
            <Button>get user token</Button>
          </Link>
        </li>
        <li>
          <GoogleSheet />
        </li>
        <li>
          <GoogleSheetLoad />
        </li>
      </ul>
    </Box>
  );
}

export default DevPage;

const listStyle = flex({
  gap: '24px',
  flexDir: 'column',
  bg: 'white',
  w: '90%',
  fontFamily: 'sans-serif',
});

function GoogleSheet() {
  const handleSubmit = async () => {
    await sendLog({ test: 'test data 입니다 ' });
  };

  return <Button onClick={handleSubmit}>sheet</Button>;
}

function GoogleSheetLoad() {
  const handleSubmit = () => {
    getIsOnLoadSheet();
  };

  return <Button onClick={handleSubmit}>Goggle Sheet Load Check</Button>;
}
