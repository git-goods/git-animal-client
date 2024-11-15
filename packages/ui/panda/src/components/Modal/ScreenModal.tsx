'use client';

import { useBodyLock } from '@gitanimals/react';
import { css } from '_panda/css';
import { XIcon } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { flex } from '_panda/patterns';
import { useDialog } from './useDialog';

interface ScreenModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

/**
 * 화면 전체를 덮는 모달 컴포넌트
 * @deprecated
 */
function ScreenModalRoot({ isOpen, onClose, children }: PropsWithChildren<ScreenModalProps>) {
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
  width: '100vw',
  height: '100vh',

  '&::backdrop': {
    background: 'black.black_75',
  },

  '@media (min-width: 1920px)': {
    width: '1400px',
    height: 'fit-content',
  },
});

function ScreenModalCloseButton({ onClose }: { onClose: () => void }) {
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

function ScreenModalHeading({ children }: { children: React.ReactNode }) {
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

function ScreenModalContent({ children }: { children: React.ReactNode }) {
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

export const ScreenModal = Object.assign(ScreenModalRoot, {
  CloseButton: ScreenModalCloseButton,
  Heading: ScreenModalHeading,
  Content: ScreenModalContent,
});

export function ScreenModalBase({ isOpen, onClose, children }: PropsWithChildren<ScreenModalProps>) {
  return (
    <ScreenModal isOpen={isOpen} onClose={onClose}>
      {onClose && <ScreenModal.CloseButton onClose={onClose} />}
      <ScreenModal.Content>{children}</ScreenModal.Content>
    </ScreenModal>
  );
}
