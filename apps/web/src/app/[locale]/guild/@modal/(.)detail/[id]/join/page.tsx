'use client';

import { css } from '_panda/css';
import { inboxQueries } from '@gitanimals/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { GuildJoinPetSelectDialog } from '@/app/[locale]/guild/_components/GuildPetSelectDialog';
import RouteModal, { RouteModalTitle } from '@/components/RouteModal';
import { useRouter } from '@/i18n/routing';
import { joinGuildAction } from '@/serverActions/guild';

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
    <RouteModal>
      <div>
        <RouteModalTitle>Choose your pet</RouteModalTitle>
        <p className={dialogDescriptionStyle}>If you choose a pet, it will be shown in the guild image.</p>
      </div>
      <GuildJoinPetSelectDialog onSubmit={submitJoinGuild} />
    </RouteModal>
  );
}

const dialogDescriptionStyle = css({
  textStyle: 'glyph20.regular',
  color: 'white.white_50',
  mt: 3,
  textAlign: 'center',
});
