'use client';

import type { ReactNode } from 'react';
import { DialogV2, type DialogV2Size } from './dialog-v2';
import { Button } from './button';

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
  isOpen,
  onClose,
  title,
  description,
  closeText = 'Close',
  children,
  size = 'sm',
}: AlertDialogV2Props) {
  const buttonSize = size === 'sm' ? 's' : size === 'full' ? 'l' : 'm';

  return (
    <DialogV2 open={isOpen} onOpenChange={onClose}>
      <DialogV2.Content size={size}>
        <DialogV2.Title>{title}</DialogV2.Title>
        {description && <DialogV2.Description>{description}</DialogV2.Description>}
        {children && <div className="w-full">{children}</div>}
        <DialogV2.Footer>
          <Button onClick={onClose} variant="primary" size={buttonSize}>
            {closeText}
          </Button>
        </DialogV2.Footer>
      </DialogV2.Content>
    </DialogV2>
  );
}
