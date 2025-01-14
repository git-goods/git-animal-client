import { redirect } from 'next/navigation';
import { checkIsLeader, getGuildBackgrounds, getGuildById, getGuildIcons } from '@gitanimals/api';
import { DialogTitle } from '@gitanimals/ui-panda';

import { InterceptingDialog } from '@/components/InterceptingDialog';

import { GuildSetting } from '../../setting/GuildSetting';

export default async function GuildSettingModal({ params }: { params: { id: string } }) {
  const isLeader = await checkIsLeader(params.id);

  const icons = await getGuildIcons();
  const backgrounds = await getGuildBackgrounds();
  const data = await getGuildById({ guildId: params.id });

  if (!isLeader) {
    alert('리더가 아닙니다.');
    redirect(`/guild/${params.id}`);
  }

  return (
    <InterceptingDialog>
      <DialogTitle>Guild Setting</DialogTitle>
      <GuildSetting icons={icons} backgrounds={backgrounds} guildId={params.id} initialData={data} />
    </InterceptingDialog>
  );
}
