import { dialogTitleStyle } from '@gitanimals/ui-panda';

import GuildCreate from '../(components)/GuildCreate';

export default function GuildCreatePage() {
  return (
    <div>
      <h2 className={dialogTitleStyle}>Create Guild</h2>
      <GuildCreate />
    </div>
  );
}
