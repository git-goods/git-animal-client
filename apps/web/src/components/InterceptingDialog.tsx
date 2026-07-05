'use client';

import { type PropsWithChildren, useEffect, useState } from 'react';
import { cn, Dialog } from '@gitanimals/ui-tailwind';

import { usePathname, useRouter } from '@/i18n/routing';
import { customScrollHorizontalStyle } from '@/styles/scrollStyle';

export function InterceptingDialog({ children }: PropsWithChildren) {
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
        {children}
      </Dialog.Content>
    </Dialog>
  );
}

const dialogContentStyle = cn('h-fit gap-8 overflow-y-auto', customScrollHorizontalStyle);
