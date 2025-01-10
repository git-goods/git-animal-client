'use client';

import { useParams } from 'next/navigation';
import { css } from '_panda/css';
import { changeMainPet } from '@gitanimals/api';

import { useRouter } from '@/i18n/routing';

import { GuildModalPageTitle } from '../../../_components/GuildModalPageLayout';
import { GuildJoinPetSelectDialog } from '../../../_components/GuildPetSelectDialog';

export default function GuildSettingPetPage() {
  const router = useRouter();
  const { id } = useParams();

  const guildId = id as string;

  const onSubmit = async (selectPersona: string) => {
    // router.push(`/guild/${guildId}/setting/pet`);
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

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '60px',
});
