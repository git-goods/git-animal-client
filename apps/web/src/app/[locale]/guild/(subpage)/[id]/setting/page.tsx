import { checkIsLeader, getGuildBackgrounds, getGuildById, getGuildIcons } from '@gitanimals/api';

import { PageModalTitle } from '@/components/PageModal';
import { redirect } from '@/i18n/routing';

import { GuildSetting } from './GuildSetting';

export default async function GuildSettingPage({ params }: { params: { id: string } }) {
  const isLeader = await checkIsLeader(params.id);

  const icons = await getGuildIcons();
  const backgrounds = await getGuildBackgrounds();
  const data = await getGuildById({ guildId: params.id });

  if (!isLeader) {
    alert('리더가 아닙니다.');
    redirect(`/guild/${params.id}`);
  }

  return (
    <>
      <PageModalTitle>Guild Setting</PageModalTitle>
      <GuildSetting icons={icons} backgrounds={backgrounds} guildId={params.id} initialData={data} />;
    </>
  );
}
