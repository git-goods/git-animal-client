'use client';

import Link from 'next/link';
import { Center } from '_panda/jsx';
import { Button } from '@gitanimals/ui-panda';

import { getToken } from '@/store/user';

function DevPage() {
  return (
    <Center h="100vh" flexDir="column" gap="24px">
      <h1>Dev list </h1>
      <ul>
        <li>
          <Link href="/dev/token">
            <Button>get user token</Button>
          </Link>
        </li>
        <li>
          <LocalLogin />
        </li>
      </ul>
    </Center>
  );
}

export default DevPage;

const LOCAL_URL = 'http://localhost:3000';

function LocalLogin() {
  const accessToken = getToken();

  if (!accessToken) return null;

  return (
    <a href={LOCAL_URL + `/dev/local?token=${accessToken}`}>
      <Button>go to local page</Button>
    </a>
  );
}
