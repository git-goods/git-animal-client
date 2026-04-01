'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { Dialog } from './dialog';
import { Button } from './button';
import { cn } from '../../utils/cn';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  children?: ReactNode;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading: externalLoading,
  children,
}: ConfirmDialogProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  const isLoading = externalLoading ?? internalLoading;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className="gap-2">
        <Dialog.Title className="text-glyph-20 text-left w-full max-1200:text-glyph-20 max-mobile:text-glyph-16">
          {title}
        </Dialog.Title>
        {description && (
          <Dialog.Description className="text-glyph-16 text-left text-white/75 w-full">
            {description}
          </Dialog.Description>
        )}
        <div className="w-full">{children}</div>
        <div className="flex gap-2 justify-end w-full mt-2">
          <Button onClick={onClose} variant="secondary" size="m">
            {cancelText}
          </Button>
          <Button onClick={handleConfirm} variant="primary" size="m" disabled={isLoading}>
            {confirmText}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
