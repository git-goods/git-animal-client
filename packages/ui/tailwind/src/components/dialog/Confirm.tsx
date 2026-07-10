'use client';

import * as React from 'react';

import { Button } from '../ui/button';

import { buttonSizeForDialogSize, Dialog, type DialogSize } from './Dialog';

interface ConfirmProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  onConfirm: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
  size?: DialogSize;
}

export function DialogConfirm({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  size = 'sm',
}: ConfirmProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConfirm = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonSize = buttonSizeForDialogSize[size];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size={size}>
        <Dialog.Title>{title}</Dialog.Title>
        {description && <Dialog.Description>{description}</Dialog.Description>}
        <Dialog.Footer>
          <Button variant="secondary" size={buttonSize} onClick={() => onOpenChange(false)} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button variant="primary" size={buttonSize} onClick={handleConfirm} disabled={isLoading}>
            {confirmText}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
