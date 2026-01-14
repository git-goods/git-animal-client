'use client';

import { type ReactNode, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn, Button, Dialog } from '@gitanimals/ui-tailwind';
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
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('Common');
  const closeDialog = () => {
    setDialog((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const confirmDialog = async () => {
    if (isLoading) return;

    if (dialog.onConfirm) {
      setIsLoading(true);
      await dialog.onConfirm();
      setIsLoading(false);
    }
    closeDialog();
  };

  return (
    <Dialog open={dialog.isOpen} onOpenChange={closeDialog}>
      <Dialog.Content>
        <Dialog.Title className={titleStyle}>{dialog.title}</Dialog.Title>
        {dialog.description && (
          <Dialog.Description className={descriptionStyle}>{dialog.description}</Dialog.Description>
        )}
        <div className="flex gap-2 justify-end w-full">
          <Button onClick={closeDialog} variant="secondary" size="m">
            {dialog.cancelText ? t(dialog.cancelText) : t('close')}
          </Button>
          {dialog.onConfirm && (
            <Button onClick={confirmDialog} variant="primary" size="m" disabled={isLoading}>
              {isLoading ? t('processing') : dialog.confirmText ? t(dialog.confirmText) : t('confirm')}
            </Button>
          )}
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

const titleStyle = cn('font-product text-glyph-20 text-left');

const descriptionStyle = cn('font-product text-glyph-16 text-left text-white/75 w-full');
