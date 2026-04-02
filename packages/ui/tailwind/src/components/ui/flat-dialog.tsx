'use client';

import { type ReactNode, useState } from 'react';
import { DialogV2, type DialogV2Size } from './dialog-v2';
import { Button } from './button';

export interface FlatDialogProps {
  // --- State ---
  isOpen: boolean;
  onClose: () => void;

  // --- Layout ---
  size?: DialogV2Size;
  showCloseButton?: boolean;

  // --- Header ---
  title: string;
  description?: ReactNode;

  // --- Body ---
  topSlot?: ReactNode;
  children?: ReactNode;

  // --- Footer ---
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;

  // --- Style ---
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

export function FlatDialog({
  isOpen,
  onClose,
  size = 'md',
  showCloseButton,
  title,
  description,
  topSlot,
  children,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  isLoading: externalLoading,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
}: FlatDialogProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  const isLoading = externalLoading ?? internalLoading;

  const shouldShowCloseButton = showCloseButton ?? size !== 'sm';
  const hasFooter = !!confirmText || !!cancelText;
  const buttonSize = size === 'sm' ? 's' : size === 'full' ? 'l' : 'm';

  const handleConfirm = async () => {
    if (isLoading || !onConfirm) return;
    setInternalLoading(true);
    try {
      await onConfirm();
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <DialogV2 open={isOpen} onOpenChange={onClose}>
      <DialogV2.Content size={size} className={className}>
        {shouldShowCloseButton && <DialogV2.CloseButton />}

        <DialogV2.Header className={headerClassName}>
          <DialogV2.Title>{title}</DialogV2.Title>
          {description && <DialogV2.Description>{description}</DialogV2.Description>}
        </DialogV2.Header>

        {topSlot}

        {children && <DialogV2.Body className={bodyClassName}>{children}</DialogV2.Body>}

        {hasFooter && (
          <DialogV2.Footer className={footerClassName}>
            {cancelText && (
              <Button variant="secondary" size={buttonSize} onClick={onCancel ?? onClose}>
                {cancelText}
              </Button>
            )}
            {confirmText && (
              <Button variant="primary" size={buttonSize} onClick={handleConfirm} disabled={isLoading}>
                {confirmText}
              </Button>
            )}
          </DialogV2.Footer>
        )}
      </DialogV2.Content>
    </DialogV2>
  );
}
