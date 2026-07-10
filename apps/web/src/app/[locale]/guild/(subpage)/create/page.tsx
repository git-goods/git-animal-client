import { dialogTitleStyle } from '@gitanimals/ui-tailwind';

import { GuildModalPageLayout } from '@/app/[locale]/guild/_components/GuildModalPageLayout';

import GuildCreate from './GuildCreate';

export default function GuildCreatePage() {
  return (
    <GuildModalPageLayout>
      <h2 className={dialogTitleStyle}>Create Guild</h2>
      <div className="flex flex-col gap-[24px]">
        <GuildCreate />
      </div>
    </GuildModalPageLayout>
  );
}
