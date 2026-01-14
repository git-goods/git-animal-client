'use client';

import { useParams } from 'next/navigation';
import { cn } from '@gitanimals/ui-tailwind';
import { changeMainPet } from '@gitanimals/api';

import { GuildModalPageTitle } from '@/app/[locale]/guild/_components/GuildModalPageLayout';
import { GuildJoinPetSelectDialog } from '@/app/[locale]/guild/_components/GuildPetSelectDialog';
import { useRouter } from '@/i18n/routing';

export default function GuildSettingPetPage() {
  const router = useRouter();
  const { id } = useParams();

  const guildId = id as string;

  const onSubmit = async (selectPersona: string) => {
    await changeMainPet({
      guildId,
      personaId: selectPersona,
    });

    router.push(`/guild/${guildId}`);
  };

  return (
    <div className={containerStyle}>
      <GuildModalPageTitle>Edit profile pet</GuildModalPageTitle>
      <GuildJoinPetSelectDialog onSubmit={onSubmit} />
    </div>
  );
}

const containerStyle = cn(
  'flex flex-col items-center gap-[60px]'
);
