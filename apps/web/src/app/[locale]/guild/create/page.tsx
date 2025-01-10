import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { dialogTitleStyle } from '@gitanimals/ui-panda';

import GuildCreate from '../(components)/GuildCreate';

export default function GuildCreatePage() {
  return (
    <div className={css({ minH: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' })}>
      <div
        className={css({
          maxWidth: '880px',
          mx: 'auto',
          background: 'gray.gray_150',
          p: '40px',
          borderRadius: '16px',
          color: 'white.white',
        })}
      >
        <h2 className={dialogTitleStyle}>Create Guild</h2>
        <Flex flexDirection="column" gap="24px">
          <GuildCreate />
        </Flex>
      </div>
    </div>
  );
}