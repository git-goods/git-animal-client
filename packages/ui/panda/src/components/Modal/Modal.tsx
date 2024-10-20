'use client';

import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import { XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}
export function Modal({ isOpen, onClose, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [isScrollLocked, setIsScrollLocked] = useState(isOpen);

  useBodyScrollLock(isScrollLocked);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  useEffect(
    function setOnCloseEventAtDialog() {
      dialogRef.current?.addEventListener('close', () => {
        setIsScrollLocked(false);
        onClose?.();
      });
    },
    [onClose],
  );

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

// TODO : hooks packages로 옮기기
const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle;
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLocked]);
};

const dialogStyle = css({
  margin: 'auto',
  borderRadius: '16px',
  backgroundColor: 'gray.gray_150',
  padding: '24px',
  minWidth: '400px',
});

const closeButtonStyle = css({
  position: 'absolute',
  top: 24,
  right: 24,
});

const contentStyle = flex({
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '28px',
  color: 'white',
});
