'use client';

import { type PropsWithChildren, useEffect, useState } from 'react';
import { css, cx } from '_panda/css';
import { Dialog } from '@gitanimals/ui-panda';

import { usePathname, useRouter } from '@/i18n/routing';
import { customScrollHorizontalStyle } from '@/styles/scrollStyle';

export default function GuildModal({ children, title }: PropsWithChildren<{ title?: string }>) {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    router.back();
  };

  useEffect(() => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
