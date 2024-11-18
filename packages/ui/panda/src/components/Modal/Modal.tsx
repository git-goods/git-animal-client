'use client';

import { useBodyLock } from '@gitanimals/react';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import { XIcon } from 'lucide-react';
import { useDialog } from './useDialog';
import { PropsWithChildren } from 'react';

interface Props {
  isOpen: boolean;
  onClose?: () => void;
}
/** @deprecated */
export function Modal({ isOpen, onClose, children }: PropsWithChildren<Props>) {
  const { dialogRef } = useDialog({ isOpen, onClose });

  useBodyLock(isOpen);

  return (
    <dialog className={dialogStyle} ref={dialogRef}>
      {onClose && (
        <button className={closeButtonStyle} onClick={onClose}>
          <XIcon size={24} color="white" />
        </button>
      )}

      <div className={contentStyle}>{children}</div>
    </dialog>
  );
}

const dialogStyle = css({
  margin: 'auto',
  borderRadius: '16px',
  backgroundColor: 'gray.gray_150',
  padding: '24px',
  minWidth: '400px',
});

const closeButtonStyle = css({
  position: 'absolute',
  top: '24px',
  right: '24px',
});

const contentStyle = flex({
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '28px',
  color: 'white',
});
