'use client';

import Link from 'next/link';
import { Center } from '_panda/jsx';
import { Button } from '@gitanimals/ui-panda';
import { sendGTMEvent } from '@next/third-parties/google';
import axios from 'axios';

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
        <li>
          <button onClick={() => sendGTMEvent({ event: 'buttonClicked', value: 'xyz' })}>Send Event</button>
        </li>
        <GoogleSheet />
      </ul>
    </Center>
  );
}

export default DevPage;

const sendLog = async (data: any) => {
  try {
    const res = await axios.post('/api/googleSheet', data);
    if (!res.data.success) {
      throw new Error('Failed to send log');
    }
  } catch (e) {
    console.error(e);
  }
};

function GoogleSheet() {
  const handleSubmit = async () => {
    await sendLog({ sumi: '21ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㅇ3' });
  };

  return <Button onClick={handleSubmit}>sheet</Button>;
}
