import Link from 'next/link';
import { Center } from '_panda/jsx';
import { Button } from '@gitanimals/ui-panda';

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
      </ul>
    </Center>
  );
}

export default DevPage;
