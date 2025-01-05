'use client';

import { css } from '_panda/css';
import { inboxQueries } from '@gitanimals/react-query';
import { Dialog } from '@gitanimals/ui-panda';
import { useQueryClient } from '@tanstack/react-query';

import { useRouter } from '@/i18n/routing';
import { joinGuildAction } from '@/serverActions/guild';

import { GuildJoinPetSelectDialog } from '../../../../(components)/GuildPetSelectDialog';
import GuildModal from '../../../GuildModal';

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

  return (
    <GuildModal>
      <div>
        <Dialog.Title className={dialogTitleStyle}>Choose your pet</Dialog.Title>
        <p className={dialogDescriptionStyle}>If you choose a pet, it will be shown in the guild image.</p>
      </div>
      <GuildJoinPetSelectDialog onSubmit={submitJoinGuild} />
    </GuildModal>
  );
}

const dialogTitleStyle = css({});

const dialogDescriptionStyle = css({
  textStyle: 'glyph20.regular',
  color: 'white.white_50',
  mt: 3,
  textAlign: 'center',
});
