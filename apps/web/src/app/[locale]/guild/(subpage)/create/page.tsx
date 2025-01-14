import { Flex } from '_panda/jsx';
import { dialogTitleStyle } from '@gitanimals/ui-panda';

import { GuildModalPageLayout } from '@/app/[locale]/guild/_components/GuildModalPageLayout';

import GuildCreate from './GuildCreate';

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
