import { dialogTitleStyle } from '@gitanimals/ui-panda';

import { GuildInfoForm } from '../(components)/GuidlInfoForm';

export default function GuildCreatePage() {
  return (
    <div>
      <h2 className={dialogTitleStyle}>Create Guild</h2>
      {/* <GuildCreate /> */}
      <GuildInfoForm />
    </div>
  );
}
