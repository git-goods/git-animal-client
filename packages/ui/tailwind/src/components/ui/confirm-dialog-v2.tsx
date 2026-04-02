'use client';

import type { ReactNode } from 'react';
import type { DialogV2Size } from './dialog-v2';
import { FlatDialog } from './flat-dialog';

export interface ConfirmDialogV2Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  children?: ReactNode;
  size?: DialogV2Size;
}

export function ConfirmDialogV2({
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  ...props
}: ConfirmDialogV2Props) {
  return (
    <FlatDialog
      {...props}
      showCloseButton={false}
      confirmText={confirmText}
      cancelText={cancelText}
    />
  );
}
