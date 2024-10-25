'use client';

import React, { useState } from 'react';
import { css } from '_panda/css';
import { Button, Modal } from '@gitanimals/ui-panda';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useChangeProductPrice, useDeleteProduct } from '@/apis/auctions/useProduct';
import { auctionQueries } from '@gitanimals/react-query';

function EditModal({ isOpen, onClose, productId }: { isOpen: boolean; onClose: () => void; productId?: string }) {
  const queryClient = useQueryClient();

  const [price, setPrice] = useState<number>(0);

  const { mutate: deleteMutate } = useDeleteProduct({
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: auctionQueries.myProductsKey(),
      });
    },
  });

  const { mutate: changePriceMutate } = useChangeProductPrice({
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: auctionQueries.myProductsKey(),
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
      <h2 className={titleStyle}>Edit Product</h2>
      <input
        className={inputStyle}
        placeholder="Type price..."
        type="number"
        value={Boolean(price) ? price : ''}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <div className={buttonWrapperStyle}>
        <Button onClick={onSave} variant="secondary" size="s">
          Save
        </Button>
        <Button onClick={onDelete} variant="primary" size="s">
          Delete
        </Button>
      </div>
    </Modal>
  );
}

export default EditModal;

const titleStyle = css({
  textStyle: 'glyph20.regular',
  textAlign: 'left',
  color: 'white.white_100',
  width: '100%',
});

const inputStyle = css({
  display: 'flex',
  height: '55px',
  padding: '14px 14px 13px 20px',
  alignItems: 'flex-start',
  gap: '8px',
  width: '100%',
  outline: 'none',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  textStyle: 'glyph16.regular',
  color: 'white.white_100',
  '&::placeholder': {
    textStyle: 'glyph16.regular',
    color: 'white.white_75',
  },
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
});

const buttonWrapperStyle = css({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
});
