'use client';

import { type PropsWithChildren, useEffect, useState } from 'react';
import { cn } from '@gitanimals/ui-tailwind';
import { DialogV2 } from '@gitanimals/ui-tailwind';

import { usePathname, useRouter } from '@/shared/i18n/routing';

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

interface RouteModalProps {
  title?: string;
  gap?: 'sm' | 'lg';
}

export default function RouteModal({ children, title, gap = 'sm' }: PropsWithChildren<RouteModalProps>) {
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
    <DialogV2 open={isOpen} onOpenChange={onClose}>
      <DialogV2.Content
        size="lg"
        className={cn(
          gap === 'sm' ? 'gap-2' : 'gap-8',
        )}
      >
        <DialogV2.CloseButton />
        {title && (
          <DialogV2.Header>
            <DialogV2.Title>{title}</DialogV2.Title>
          </DialogV2.Header>
        )}
        <DialogV2.Body>
          {children}
        </DialogV2.Body>
      </DialogV2.Content>
    </DialogV2>
  );
}

export function RouteModalTitle({ children }: PropsWithChildren) {
  return <DialogV2.Title>{children}</DialogV2.Title>;
}
