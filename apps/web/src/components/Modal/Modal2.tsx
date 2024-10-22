import type { PropsWithChildren } from 'react';
import { css } from '_panda/css';
import { center } from '_panda/patterns';
import { X } from 'lucide-react';

import Portal from '../Portal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ children, isOpen, onClose }: PropsWithChildren<ModalProps>) {
  if (!isOpen) return null;

  return (
    <Portal>
      <article className={modalStyle}>
        <div className={modalContentStyle}>
          <button className={closeButtonStyle} onClick={onClose}>
            <X size={40} color="#ffffffba" width={40} height={40} />
          </button>
          {children}
        </div>
      </article>
    </Portal>
  );
}

const modalStyle = center({
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

const modalContentStyle = center({
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
  right: '28px',
  top: '28px',
});
