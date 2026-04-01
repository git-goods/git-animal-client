'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { AlertDialog, ConfirmDialog } from '@gitanimals/ui-tailwind';
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
 * 전역적으로 사용할 수 있는 다이얼로그 훅
 * 간단하게 사용할 수 있도록 생성, 복잡한 Dialog는 직접 생성 권장
 */
export function useDialog() {
  const [_, setDialog] = useAtom(dialogAtom);

  const showDialog = (state: Omit<DialogState, 'isOpen'>) => {
    setDialog({
      isOpen: true,
      ...state,
    });
  };

  const closeDialog = () => {
    setDialog((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return { showDialog, closeDialog };
}

/**
 * 전역적으로 사용하는 다이얼로그 UI 컴포넌트
 */
export function DialogComponent() {
  const [dialog, setDialog] = useAtom(dialogAtom);
  const t = useTranslations('Common');

  const closeDialog = () => {
    setDialog((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  if (dialog.onConfirm) {
    return (
      <ConfirmDialog
        isOpen={dialog.isOpen}
        onClose={closeDialog}
        onConfirm={dialog.onConfirm}
        title={String(dialog.title)}
        description={dialog.description}
        cancelText={dialog.cancelText ? t(dialog.cancelText) : t('close')}
        confirmText={dialog.confirmText ? t(dialog.confirmText) : t('confirm')}
      />
    );
  }

  return (
    <AlertDialog
      isOpen={dialog.isOpen}
      onClose={closeDialog}
      title={String(dialog.title)}
      description={dialog.description}
      closeText={dialog.cancelText ? t(dialog.cancelText) : t('close')}
    />
  );
}
