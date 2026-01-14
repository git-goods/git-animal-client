'use client';

import { type PropsWithChildren, useEffect, useState } from 'react';
import { cn } from '@gitanimals/ui-tailwind';
import { Dialog } from '@gitanimals/ui-tailwind';

import { usePathname, useRouter } from '@/i18n/routing';
import { customScrollHorizontalStyle } from '@/styles/scrollStyle';

/**
 * 라우트 모달 컴포넌트
 * - 라우트 변경에 따라 모달을 열고 닫는 기능을 제공
 * - 뒤로가기 시 모달이 닫힘
 * - Dialog 컴포넌트를 사용하여 모달 UI 구현
 * - Intercepting Routes를 사용하여 모달 열기/닫기 기능 구현
 *
 * @param children - 모달 내부에 렌더링할 컨텐츠
 * @param title - 모달 제목 (선택사항)
 */

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
      <Dialog.Content
        size="large"
        className={cn('h-fit gap-2 overflow-y-auto max-mobile:h-screen', customScrollHorizontalStyle)}
      >
        {title && <Dialog.Title>{title}</Dialog.Title>}
        {children}
      </Dialog.Content>
    </Dialog>
  );
}

export function RouteModalTitle({ children }: PropsWithChildren) {
  return <Dialog.Title>{children}</Dialog.Title>;
}
