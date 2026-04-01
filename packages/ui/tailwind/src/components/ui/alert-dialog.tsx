'use client';

import type { ReactNode } from 'react';
import { Dialog } from './dialog';
import { Button } from './button';
import { cn } from '../../utils/cn';

export interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  closeText?: string;
  children?: ReactNode;
}

export function AlertDialog({ isOpen, onClose, title, description, closeText = 'Close', children }: AlertDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Title className={titleStyle}>{title}</Dialog.Title>
        {description && <Dialog.Description className={descriptionStyle}>{description}</Dialog.Description>}
        {children}
        <div className="flex gap-2 justify-end w-full">
          <Button onClick={onClose} variant="primary" size="m">
            {closeText}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

const titleStyle = cn('font-product text-glyph-20 text-left');
const descriptionStyle = cn('font-product text-glyph-16 text-left text-white/75 w-full');
