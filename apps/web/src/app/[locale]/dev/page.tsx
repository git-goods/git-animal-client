import { css } from '_panda/css';
import { Box } from '_panda/jsx';

import GNB from '@/components/GNB/GNB';

import DevClient from './Client';

async function DevPage() {
  return (
    <Box p={32}>
      <GNB />
      <h1>server</h1>
      <hr className={dividerStyle} />
      <h1>client</h1>
      <DevClient />
    </Box>
  );
}

export default DevPage;

const dividerStyle = css({
  margin: '24px 0',
});
