'use client';

import type { ReactNode } from 'react';
import { Dialog } from './dialog';
import { Button } from './button';

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
          <Button onClick={onClose} variant="primary" size="m">
            {closeText}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
