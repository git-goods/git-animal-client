import { getUser } from '@gitanimals/api';

import { auth } from '@/auth';

async function ServerDevPage() {
  const session = await auth();
  const data = await getUser();
  console.log('data: ', data);

  return <div>ServerDevPage</div>;
}

export default ServerDevPage;
