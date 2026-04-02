'use client';

import type { ReactNode } from 'react';
import type { DialogV2Size } from './dialog-v2';
import { FlatDialog } from './flat-dialog';

export interface AlertDialogV2Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  closeText?: string;
  children?: ReactNode;
  size?: DialogV2Size;
}

export function AlertDialogV2({
  closeText = 'Close',
  ...props
}: AlertDialogV2Props) {
  return (
    <FlatDialog
      {...props}
      showCloseButton={false}
      confirmText={closeText}
      onConfirm={props.onClose}
    />
  );
}
