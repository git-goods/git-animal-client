'use client';

import type { ReactNode } from 'react';
import { Dialog } from '../ui/dialog';

interface CommonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: 'default' | 'large' | 'screen';
}

export function CommonDialog({ isOpen, onClose, title, description, children, size }: CommonDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content size={size}>
        {title && <Dialog.Title className="flex flex-col justify-end">{title}</Dialog.Title>}
        {description && <Dialog.Description className="mt-4">{description}</Dialog.Description>}
        {children}
      </Dialog.Content>
    </Dialog>
  );
}
