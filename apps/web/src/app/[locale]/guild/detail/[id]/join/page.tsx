'use client';

import { css } from '_panda/css';
import { inboxQueries } from '@gitanimals/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { useRouter } from '@/i18n/routing';
import { joinGuildAction } from '@/serverActions/guild';

import { GuildJoinPetSelectDialog } from '../../../(components)/GuildPetSelectDialog';

export default function GuildJoinPage({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const submitJoinGuild = async (selectPersona: string) => {
    try {
      await joinGuildAction({
        guildId: params.id,
        personaId: selectPersona,
      });

      router.replace(`/guild`);

      queryClient.invalidateQueries({ queryKey: inboxQueries.allKey() });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <h2 className={dialogTitleStyle}>Choose your pet</h2>
        <p className={dialogDescriptionStyle}>If you choose a pet, it will be shown in the guild image.</p>
      </div>
      <GuildJoinPetSelectDialog onSubmit={submitJoinGuild} />;
    </>
  );
}

const dialogTitleStyle = css({
  textStyle: 'glyph48.bold',
  color: 'white.white_100',
  textAlign: 'center',
  '@media (max-width: 1200px)': {
    textStyle: 'glyph32.bold',
  },
  _mobile: {
    textStyle: 'glyph24.bold',
  },
});

const dialogDescriptionStyle = css({
  textStyle: 'glyph20.regular',
  color: 'white.white_50',
  mt: 3,
  textAlign: 'center',
});
