import type { PropsWithChildren } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';

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
 *
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
      <ModalOverlay>
        <ModalContent key="modal" ref={modalRef}>
          {children}
        </ModalContent>
      </ModalOverlay>
    </Portal>
  );
}

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  padding: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: modalOverlay;
`;

const ModalContent = styled.div`
  /* background: ${({ theme }) => theme.colors.bg.surface4}; */
  border-radius: 30px;
  max-width: 300px;
  width: 100%;
`;
// const modalContentCss = {
//   background: 'bg.surface4',
//   borderRadius: '30px',
//   maxWidth: '300px',
//   width: '100%',
// };

export default Modal;
