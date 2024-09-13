import React, { useState } from 'react';
import { css } from '_panda/css';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useChangeProductPrice, useDeleteProduct } from '@/apis/auctions/useProduct';
import DottedDoubleBox from '@/components/DottedBox/DottedDoubleBox';
import DottedThreeBox from '@/components/DottedBox/DottedThreeBox';
import Modal from '@/components/Modal/Modal';

function EditModal({ isOpen, onClose, productId }: { isOpen: boolean; onClose: () => void; productId?: string }) {
  const queryClient = useQueryClient();

  const [price, setPrice] = useState<number>(0);

  const { mutate: deleteMutate } = useDeleteProduct({
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['my', 'products'], // TODO :getMyProductsQueryKey()로 변경
      });
    },
  });

  const { mutate: changePriceMutate } = useChangeProductPrice({
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['my', 'products'], // TODO :getMyProductsQueryKey()로 변경
      });
    },
  });
  const onDelete = () => {
    if (!productId) return;
    // TODO: loading 추가
    // TODO :optimistic update (react query)

    deleteMutate(productId);
  };

  const onSave = () => {
    if (!productId) return;
    if (!price) {
      toast.info('수정할 금액을 입력해주세요', {
        position: 'top-center',
      });
      return;
    }
    changePriceMutate({ id: productId, price: String(price) });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <DottedThreeBox width={402} height={164} bgColor="rgba(255, 255, 255, 0.7)">
        <div>
          <div className={inputWrapperStyle}>
            <DottedDoubleBox width={358} height={84} bgColor="#fff">
              <span className={inputLabelStyle}>price</span>
              <input
                className={inputStyle}
                placeholder="Type price..."
                type="number"
                value={Boolean(price) ? price : ''}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </DottedDoubleBox>
          </div>
          <div className={buttonWrapperStyle}>
            <button onClick={onSave}>
              <DottedDoubleBox width={103} height={36} bgColor="#3791FF">
                Save
              </DottedDoubleBox>
            </button>
            <button onClick={onClose}>
              <DottedDoubleBox width={103} height={36} bgColor="#6DB33F">
                Cancel
              </DottedDoubleBox>
            </button>
            <button onClick={onDelete}>
              <DottedDoubleBox width={103} height={36} bgColor="#F6869F">
                Delete
              </DottedDoubleBox>
            </button>
          </div>
        </div>
      </DottedThreeBox>
    </Modal>
  );
}

export default EditModal;

const inputWrapperStyle = css({
  position: 'relative',
  margin: '6px auto 8px',
  width: 'fit-content',
});

const inputLabelStyle = css({
  position: 'absolute',
  color: '#b5b5b5',
  fontSize: '10px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '140%' /* 14px */,
  letterSpacing: '-0.413px',
  left: '12px',
  top: '8px',
});

const inputStyle = css({
  border: 'none',
  width: '100%',
  height: '100%',
  outline: 'none',
  backgroundColor: 'transparent',
  textAlign: 'center',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '140%' /* 28px */,
  letterSpacing: '-0.413px',
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
});

const buttonWrapperStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  margin: 0,
  width: '100%',
  maxWidth: '358px',
  gap: '8px',
  textAlign: 'center',
  padding: '0 8px',
});
