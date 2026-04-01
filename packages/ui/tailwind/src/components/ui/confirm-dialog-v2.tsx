'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { DialogV2, type DialogV2Size } from './dialog-v2';
import { Button } from './button';

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
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading: externalLoading,
  children,
  size = 'sm',
}: ConfirmDialogV2Props) {
  const [internalLoading, setInternalLoading] = useState(false);
  const isLoading = externalLoading ?? internalLoading;
  const buttonSize = size === 'sm' ? 's' : size === 'full' ? 'l' : 'm';

  const handleConfirm = async () => {
    if (isLoading) return;
    setInternalLoading(true);
    try {
      await onConfirm();
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <DialogV2 open={isOpen} onOpenChange={onClose}>
      <DialogV2.Content size={size}>
        <DialogV2.Title>{title}</DialogV2.Title>
        {description && <DialogV2.Description>{description}</DialogV2.Description>}
        {children && <div className="w-full">{children}</div>}
        <DialogV2.Footer>
          <Button onClick={onClose} variant="secondary" size={buttonSize}>
            {cancelText}
          </Button>
          <Button onClick={handleConfirm} variant="primary" size={buttonSize} disabled={isLoading}>
            {confirmText}
          </Button>
        </DialogV2.Footer>
      </DialogV2.Content>
    </DialogV2>
  );
}
