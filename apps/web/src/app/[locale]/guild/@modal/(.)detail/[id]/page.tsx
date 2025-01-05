'use client';

import { css, cx } from '_panda/css';
import { Dialog } from '@gitanimals/ui-panda';

import { useRouter } from '@/i18n/routing';
import { customScrollHorizontalStyle } from '@/styles/scrollStyle';

import { GuildDetail } from '../../../GuildDetail';

export default function GuildModal({ params }: { params: { id: string } }) {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <Dialog.Content size="large" className={dialogContentStyle}>
        <GuildDetail guildId={params.id} onJoin={() => router.push(`/guild/detail/${params.id}/join`)} />
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
