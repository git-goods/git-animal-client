'use client';

import { type PropsWithChildren, useEffect, useState } from 'react';
import { cn, Dialog } from '@gitanimals/ui-tailwind';

import { usePathname, useRouter } from '@/i18n/routing';
import { customScrollHorizontalStyle } from '@/styles/scrollStyle';

export default function RouteModal({ children, title }: PropsWithChildren<{ title?: string }>) {
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
      <Dialog.Content size="lg" className={dialogContentStyle}>
        {title && <Dialog.Title>{title}</Dialog.Title>}
        {children}
      </Dialog.Content>
    </Dialog>
  );
}

const dialogContentStyle = cn('h-fit gap-8 overflow-y-auto mobile:h-[100vh]', customScrollHorizontalStyle);

export function RouteModalTitle({ children }: PropsWithChildren) {
  return <Dialog.Title>{children}</Dialog.Title>;
}
