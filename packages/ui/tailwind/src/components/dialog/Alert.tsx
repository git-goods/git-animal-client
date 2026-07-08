'use client';

import * as React from 'react';

import { Button } from '../ui/button';

import { buttonSizeForDialogSize, Dialog, type DialogSize } from './Dialog';

interface AlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmText?: string;
  size?: DialogSize;
}

export function DialogAlert({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  size = 'sm',
}: AlertProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size={size}>
        <Dialog.Title>{title}</Dialog.Title>
        {description && <Dialog.Description>{description}</Dialog.Description>}
        <Dialog.Footer>
          <Button variant="primary" size={buttonSizeForDialogSize[size]} onClick={() => onOpenChange(false)}>
            {confirmText}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
