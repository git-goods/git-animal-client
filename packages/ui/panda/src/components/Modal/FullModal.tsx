'use client';

import { useBodyLock } from '@gitanimals/react';
import { css } from '_panda/css';
import { XIcon } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { flex } from '_panda/patterns';
import { useDialog } from './useDialog';

interface FullModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

function FullModalRoot({ isOpen, onClose, children }: PropsWithChildren<FullModalProps>) {
  const { dialogRef } = useDialog({ isOpen, onClose });

  useBodyLock(isOpen);

  return (
    <dialog className={dialogStyle} ref={dialogRef}>
      {children}
    </dialog>
  );
}

const dialogStyle = css({
  margin: 'auto',
  borderRadius: '16px',
  backgroundColor: 'gray.gray_150',
  padding: '24px',

  width: 'calc(100vw - 400px)',
  height: 'calc(100vh - 240px)',

  '&::backdrop': {
    background: 'black.black_75',
  },

  '@media (max-width: 1200px)': {
    width: 'calc(100vw - 240px)',
    height: 'calc(100vh - 120px)',
  },
  _mobile: {
    width: '100vw',
    height: '100vh',
  },
});

function FullModalCloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button className={closeButtonStyle} onClick={onClose}>
      <XIcon size={24} color="white" />
    </button>
  );
}

const closeButtonStyle = css({
  position: 'absolute',
  top: 24,
  right: 24,
});

function FullModalHeading({ children }: { children: React.ReactNode }) {
  return <h1 className={headingStyle}>{children}</h1>;
}

const headingStyle = css({
  textStyle: 'glyph48.bold',
  color: 'white',
  textAlign: 'center',

  '@media (max-width: 1200px)': {
    textStyle: 'glyph32.bold',
  },
});

function FullModalContent({ children }: { children: React.ReactNode }) {
  return <div className={contentStyle}>{children}</div>;
}

const contentStyle = flex({
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '28px',
  color: 'white',
  height: '100%',
});

export const FullModal = Object.assign(FullModalRoot, {
  CloseButton: FullModalCloseButton,
  Heading: FullModalHeading,
  Content: FullModalContent,
});

/** @deprecated */
export function FullModalBase({ isOpen, onClose, children }: PropsWithChildren<FullModalProps>) {
  return (
    <FullModal isOpen={isOpen} onClose={onClose}>
      {onClose && <FullModal.CloseButton onClose={onClose} />}
      <FullModal.Content>{children}</FullModal.Content>
    </FullModal>
  );
}
