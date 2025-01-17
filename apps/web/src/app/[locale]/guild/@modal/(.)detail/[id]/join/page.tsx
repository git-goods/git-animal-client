'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { inboxQueries } from '@gitanimals/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { GuildJoinPetSelectDialog } from '@/app/[locale]/guild/_components/GuildPetSelectDialog';
import RouteModal, { RouteModalTitle } from '@/components/RouteModal';
import { useRouter } from '@/i18n/routing';
import { joinGuildAction } from '@/serverActions/guild';

export default function GuildJoinModal({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(true);

  const submitJoinGuild = async (selectPersona: string) => {
    try {
      await joinGuildAction({
        guildId: params.id,
        personaId: selectPersona,
      });
      setIsOpen(false);

      queryClient.invalidateQueries({ queryKey: inboxQueries.allKey() });
      router.replace(`/guild?search=true`);
      toast.success(t('Guild.join-request-success'));
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

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
