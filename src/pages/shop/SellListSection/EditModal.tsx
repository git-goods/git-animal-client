import React from 'react';
import styled from 'styled-components';

import DottedDoubleBox from '@/components/DottedBox/DottedDoubleBox';
import DottedThreeBox from '@/components/DottedBox/DottedThreeBox';
import Modal from '@/components/Modal/Modal';

function EditModal({ isOpen, onClose, productId }: { isOpen: boolean; onClose: () => void; productId?: string }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <DottedThreeBox width={402} height={164} bgColor="rgba(255, 255, 255, 0.7)">
        <EditModalInner>
          <InputWrapper>
            <DottedDoubleBox width={358} height={84} bgColor="#fff">
              <InputLabel>price</InputLabel>
              <Input placeholder="Type price..." />
            </DottedDoubleBox>
          </InputWrapper>
          <ButtonWrapper>
            <DottedDoubleBox width={103} height={36} bgColor="#3791FF">
              Save
            </DottedDoubleBox>
            <DottedDoubleBox width={103} height={36} bgColor="#6DB33F">
              Cancel
            </DottedDoubleBox>
            <DottedDoubleBox width={103} height={36} bgColor="#F6869F">
              Delete
            </DottedDoubleBox>
          </ButtonWrapper>
        </EditModalInner>
      </DottedThreeBox>
    </Modal>
  );
}

export default EditModal;

const EditModalInner = styled.div``;

const InputWrapper = styled.div`
  position: relative;
  margin: 6px auto 8px;
  width: fit-content;
`;

const InputLabel = styled.span`
  position: absolute;
  color: #b5b5b5;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 14px */
  letter-spacing: -0.413px;
  left: 12px;
  top: 8px;
`;
const Input = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  outline: none;
  background-color: transparent;
  text-align: center;

  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  letter-spacing: -0.413px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  max-width: 358px;
  gap: 8px;
  text-align: center;
  padding: 0 8px;
`;
