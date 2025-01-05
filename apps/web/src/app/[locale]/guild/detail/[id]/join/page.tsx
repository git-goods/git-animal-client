'use client';

import { inboxQueries } from '@gitanimals/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { useRouter } from '@/i18n/routing';
import { joinGuildAction } from '@/serverActions/guild';

import { GuildJoinPetSelectDialog } from '../../../GuildPetSelectDialog';

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

  return <GuildJoinPetSelectDialog onSubmit={submitJoinGuild} />;
}
