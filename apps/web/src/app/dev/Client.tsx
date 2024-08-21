'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Box } from '_panda/jsx';
import { flex } from '_panda/patterns';
import { getUser } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-panda';

import { useClientSession } from '@/utils/clientAuth';
import { getIsOnLoadSheet, sendLog } from '@/utils/log';

function DevClient() {
  const { data: session, status } = useClientSession();

  useEffect(() => {
    // 여기서 정보를 가져올 수 있는게 목표임
    getUser().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <Box>
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
        <li>
          <Link href="/dev/server">
            <Button>Server</Button>
          </Link>
        </li>
      </ul>
    </Box>
  );
}

export default DevClient;

const listStyle = flex({
  marginTop: '24px',
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
