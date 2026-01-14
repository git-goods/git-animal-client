import { cn } from '@gitanimals/ui-tailwind';

import { GuildModalPageLayout } from '@/app/[locale]/guild/_components/GuildModalPageLayout';

import GuildCreate from './GuildCreate';

const dialogTitleStyle = cn(
  'font-product text-glyph-48 font-bold text-white text-center',
  'max-[1200px]:text-glyph-32',
  'max-mobile:text-glyph-24'
);

export default function GuildCreatePage() {
  return (
    <GuildModalPageLayout>
      <h2 className={dialogTitleStyle}>Create Guild</h2>
      <div className="flex flex-col gap-6">
        <GuildCreate />
      </div>
    </GuildModalPageLayout>
  );
}
