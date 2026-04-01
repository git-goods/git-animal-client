'use client';

import { cn } from '@gitanimals/ui-tailwind';
import { inboxQueries } from '@gitanimals/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { GuildJoinPetSelectDialog } from '@/app/[locale]/guild/_components/GuildPetSelectDialog';
import { useRouter } from '@/i18n/routing';
import { joinGuildAction } from '@/serverActions/guild';

const dialogTitleStyle = cn(
  'font-product text-glyph-48 font-bold text-white text-center',
  'max-[1200px]:text-glyph-32',
  'max-mobile:text-glyph-24'
);

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

const dialogDescriptionStyle = cn(
  'font-product text-glyph-20 text-white/50 mt-3 text-center'
);
