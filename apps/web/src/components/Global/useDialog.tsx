'use client';

import { type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Dialog } from '@gitanimals/ui-tailwind';
import { atom, useAtom } from 'jotai';

interface DialogState {
  isOpen: boolean;
  title: ReactNode | string;
  description?: ReactNode | string;
  onConfirm?: () => void | Promise<void>;
  cancelText?: string;
  confirmText?: string;
}

const dialogAtom = atom<DialogState>({
  isOpen: false,
  title: '',
  description: '',
  onConfirm: undefined,
});

/**
 * 전역적으로 사용할 수 있는 다이얼로그 훅.
 * 간단한 confirm/alert 용도. 복잡한 다이얼로그는 컴파운드 <Dialog> 직접 사용 권장.
 */
export function useDialog() {
  const [, setDialog] = useAtom(dialogAtom);

  const showDialog = (state: Omit<DialogState, 'isOpen'>) => {
    setDialog({ isOpen: true, ...state });
  };

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, isOpen: false }));
  };

  return { showDialog, closeDialog };
}

/**
 * 전역 다이얼로그 UI. onConfirm이 없으면 Alert 로, 있으면 Confirm 으로 동작.
 */
export function DialogComponent() {
  const [dialog, setDialog] = useAtom(dialogAtom);
  const t = useTranslations('Common');

  const close = () => setDialog((prev) => ({ ...prev, isOpen: false }));

  const confirmText = t(dialog.confirmText ?? 'confirm');
  const cancelText = t(dialog.cancelText ?? 'close');

  if (dialog.onConfirm) {
    return (
      <Dialog.Confirm
        open={dialog.isOpen}
        onOpenChange={(o) => !o && close()}
        title={dialog.title}
        description={dialog.description}
        onConfirm={dialog.onConfirm}
        confirmText={confirmText}
        cancelText={cancelText}
        size="md"
      />
    );
  }

  return (
    <Dialog.Alert
      open={dialog.isOpen}
      onOpenChange={(o) => !o && close()}
      title={dialog.title}
      description={dialog.description}
      confirmText={cancelText /* 기존 close 텍스트 유지 */}
      size="md"
    />
  );
}
