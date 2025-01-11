import { Flex } from '_panda/jsx';
import { dialogTitleStyle } from '@gitanimals/ui-panda';

import GuildCreate from '../_components/GuildCreate';
import { GuildModalPageLayout } from '../_components/GuildModalPageLayout';

export default function GuildCreatePage() {
  return (
    <GuildModalPageLayout>
      <h2 className={dialogTitleStyle}>Create Guild</h2>
      <Flex flexDirection="column" gap="24px">
        <GuildCreate />
      </Flex>
    </GuildModalPageLayout>
  );
}
