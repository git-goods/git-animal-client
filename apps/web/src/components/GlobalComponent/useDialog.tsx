'use client';

import { type ReactNode, useState } from 'react';
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { Button, Dialog } from '@gitanimals/ui-panda';
import { atom, useAtom } from 'jotai';

interface DialogState {
  isOpen: boolean;
  title: ReactNode | string;
  description?: ReactNode | string;
  onConfirm?: () => void | Promise<void>;
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
    // closeDialog();
  };

  return (
    <Dialog open={dialog.isOpen} onOpenChange={closeDialog}>
      <Dialog.Content>
        <Dialog.Title className={titleStyle}>{dialog.title}</Dialog.Title>
        {dialog.description && (
          <Dialog.Description className={descriptionStyle}>{dialog.description}</Dialog.Description>
        )}
        <Flex gap="8px" justifyContent="flex-end" width="100%">
          {dialog.onConfirm && (
            <Button onClick={confirmDialog} variant="secondary" size="m" disabled={isLoading}>
              {isLoading ? '처리중...' : '확인'}
            </Button>
          )}
          <Button onClick={closeDialog} variant="primary" size="m">
            닫기
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog>
  );
}

const titleStyle = css({
  textStyle: 'glyph20.regular',
  textAlign: 'left',
});

const descriptionStyle = css({
  textStyle: 'glyph16.regular',
  textAlign: 'left',
  color: 'white.white_75',
  width: '100%',
});
