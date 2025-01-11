import { getGuildBackgrounds, getGuildById, getGuildIcons } from '@gitanimals/api';

import { GuildSetting } from './GuildSetting';

export default async function GuildSettingPage({ params }: { params: { id: string } }) {
  const icons = await getGuildIcons();
  const backgrounds = await getGuildBackgrounds();
  const data = await getGuildById({ guildId: params.id });

  return <GuildSetting icons={icons} backgrounds={backgrounds} guildId={params.id} initialData={data} />;
}
