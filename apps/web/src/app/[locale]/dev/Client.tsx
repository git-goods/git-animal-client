'use client';

import { Button } from '@gitanimals/ui-tailwind';

import { Link } from '@/i18n/routing';
import { useDevMode } from '@/lib/devtools/devtools';
import { useClientSession } from '@/utils/clientAuth';
import { getIsOnLoadSheet, sendLog } from '@/utils/log';

function DevClient() {
  const { isDevMode } = useDevMode();
  const { data: session, status } = useClientSession();

  return (
    <div>
      <li>devMode: {isDevMode}</li>
      <ul className="mt-6 flex flex-col gap-6 bg-white w-[90%] font-sans">
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
    </div>
  );
}

export default DevClient;

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
