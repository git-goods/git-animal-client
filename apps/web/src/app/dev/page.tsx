'use client';

import Link from 'next/link';
import { Center } from '_panda/jsx';
import { Button } from '@gitanimals/ui-panda';

import { sendLog } from '@/utils/log';

function DevPage() {
  return (
    <Center h="100vh" flexDir="column" gap="24px" bg="white">
      <h1>Dev list </h1>
      <ul>
        <li>
          <Link href="/dev/token">
            <Button>get user token</Button>
          </Link>
        </li>

        <GoogleSheet />
      </ul>
    </Center>
  );
}

export default DevPage;

function GoogleSheet() {
  const handleSubmit = async () => {
    await sendLog({ test: 'test data 입니다 ' });
  };

  return <Button onClick={handleSubmit}>sheet</Button>;
}
