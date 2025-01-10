import { checkIsLeader, getGuildBackgrounds, getGuildById, getGuildIcons } from '@gitanimals/api';
import { dialogTitleStyle } from '@gitanimals/ui-panda';

import { redirect } from '@/i18n/routing';

import { GuildSetting } from './GuildSetting';

export default async function GuildSettingPage({ params }: { params: { id: string } }) {
  const isLeader = await checkIsLeader(params.id);

  const icons = await getGuildIcons();
  const backgrounds = await getGuildBackgrounds();
  const data = await getGuildById({ guildId: params.id });

  if (!isLeader) {
    redirect(`/guild/${params.id}`);
  }

  return (
    <>
      <h2 className={dialogTitleStyle}>Guild Setting</h2>
      <GuildSetting icons={icons} backgrounds={backgrounds} guildId={params.id} initialData={data} />;
    </>
  );
}
