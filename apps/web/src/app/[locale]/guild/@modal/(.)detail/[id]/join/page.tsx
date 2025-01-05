'use client';

import { css, cx } from '_panda/css';
import { inboxQueries } from '@gitanimals/react-query';
import { Dialog } from '@gitanimals/ui-panda';
import { useQueryClient } from '@tanstack/react-query';

import { useRouter } from '@/i18n/routing';
import { joinGuildAction } from '@/serverActions/guild';
import { customScrollHorizontalStyle } from '@/styles/scrollStyle';

import { GuildJoinPetSelectDialog } from '../../../../(components)/GuildPetSelectDialog';

export default function GuildJoinModal({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const submitJoinGuild = async (selectPersona: string) => {
    try {
      await joinGuildAction({
        guildId: params.id,
        personaId: selectPersona,
      });

      queryClient.invalidateQueries({ queryKey: inboxQueries.allKey() });
      router.replace(`/guild`);
    } catch (error) {
      console.error(error);
    }
  };

  const onClose = () => {
    router.back();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <Dialog.Content size="large" className={dialogContentStyle}>
        <GuildJoinPetSelectDialog onSubmit={submitJoinGuild} />
      </Dialog.Content>
    </Dialog>
  );
}

const dialogContentStyle = cx(
  css({
    height: 'fit-content',
    gap: 8,
    overflowY: 'auto',
  }),
  customScrollHorizontalStyle,
);
