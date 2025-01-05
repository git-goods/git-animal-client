'use client';

import type { PropsWithChildren } from 'react';
import { css, cx } from '_panda/css';
import { Dialog } from '@gitanimals/ui-panda';

import { useRouter } from '@/i18n/routing';
import { customScrollHorizontalStyle } from '@/styles/scrollStyle';

export default function GuildModal({ children, title }: PropsWithChildren<{ title?: string }>) {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <Dialog.Content size="large" className={dialogContentStyle}>
        {title && <Dialog.Title>{title}</Dialog.Title>}
        {children}
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
