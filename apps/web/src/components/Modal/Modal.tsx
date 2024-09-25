import type { PropsWithChildren } from 'react';
import { useRef } from 'react';
import { css } from '_panda/css';

import useOutsideClick from '@/hooks/useOutsideClick';

import Portal from '../Portal';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * @description Modal 컴포넌트
 * @param isOpen 모달 오픈 여부
 * @param onClose 모달 닫기
 * @param padding 모달 패딩 값 (default: 20px 24px)
 * @param children 모달 내부 컨텐츠
 * @deprecated
 */
function Modal({ isOpen, children, onClose }: PropsWithChildren<ModalProps>) {
  const modalRef = useRef(null);

  useOutsideClick({
    ref: modalRef,
    handler: () => {
      onClose();
    },
  });

  if (!isOpen) return null;
  return (
    <Portal>
      <div className={modalOverlayStyle}>
        <div className={modalContentStyle} key="modal" ref={modalRef}>
          {children}
        </div>
      </div>
    </Portal>
  );
}

const modalOverlayStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0, 0, 0, 0.2)',
  padding: '28px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: '200', // TODO: zIndex 관리
});

const modalContentStyle = css({
  borderRadius: '30px',
  width: 'fit-content',
});

export default Modal;
