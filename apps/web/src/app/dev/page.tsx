'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { Center } from '_panda/jsx';
import { Button } from '@gitanimals/ui-panda';
import { sendGTMEvent } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: 'GitAnimals | Dev',
};

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
          <button onClick={() => sendGTMEvent({ event: 'buttonClicked', value: 'xyz' })}>Send Event</button>
        </li>
      </ul>
    </Center>
  );
}

export default DevPage;
