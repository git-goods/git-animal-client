'use client';

import { useBodyLock } from '@gitanimals/react';
import { css } from '_panda/css';
import { center } from '_panda/patterns';
import { XIcon } from 'lucide-react';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose?: () => void;
}

export function FullModal({ isOpen, onClose, children }: PropsWithChildren<Props>) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [isScrollLocked, setIsScrollLocked] = useState(isOpen);

  useBodyLock(isScrollLocked);

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
      <div className={contentStyle}>
        {onClose && (
          <button className={closeButtonStyle} onClick={onClose}>
            <XIcon size={24} color="white" />
          </button>
        )}

        {children}
      </div>
    </dialog>
  );
}

const dialogStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'black.black_75',
  zIndex: 3000,
  padding: '120px 200px',

  '@media (max-width: 1200px)': {
    padding: '120px 60px',
  },
  _mobile: {
    p: 0,
  },
});

const contentStyle = center({
  backgroundColor: 'gray.gray_150',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  borderRadius: '20px',
  position: 'relative',
  padding: '80px 100px',
  color: 'white',

  _mobile: {
    borderRadius: 0,
  },
});

const closeButtonStyle = css({
  position: 'absolute',
  top: 24,
  right: 24,
});

export function FullModalHeading({ children }: { children: React.ReactNode }) {
  return <h1 className={headingStyle}>{children}</h1>;
}

const headingStyle = css({
  textStyle: 'glyph48.bold',
  color: 'white',
  textAlign: 'center',
  marginBottom: 40,

  '@media (max-width: 1200px)': {
    textStyle: 'glyph32.bold',
  },
});
