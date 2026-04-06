'use client';

import React, { useState } from 'react';
import { auctionQueries, useChangeProductPrice, useDeleteProduct, userQueries } from '@gitanimals/react-query';
import { Button, Dialog } from '@gitanimals/ui-tailwind';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

const titleStyle = 'w-full text-left text-glyph-20 font-normal text-white-100';

const inputStyle =
  'flex h-[55px] w-full items-start gap-2 rounded-lg border border-white/25 py-[14px] pl-5 pr-[14px] pb-[13px] text-glyph-16 font-normal text-white-100 outline-none ' +
  'placeholder:text-glyph-16 placeholder:font-normal placeholder:text-white/75 ' +
  '[&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none';

const buttonWrapperStyle = 'flex w-full justify-end gap-2';

function EditModal({ isOpen, onClose, productId }: { isOpen: boolean; onClose: () => void; productId?: string }) {
  const queryClient = useQueryClient();
  const { t } = useTranslation('shop');

  const [price, setPrice] = useState<number>(0);

  const { mutate: deleteMutate } = useDeleteProduct({
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: auctionQueries.allKey(),
      });
      queryClient.invalidateQueries({
        queryKey: userQueries.allPersonasKey(),
      });
    },
  });

  const { mutate: changePriceMutate } = useChangeProductPrice({
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: auctionQueries.allKey(),
      });
      queryClient.invalidateQueries({
        queryKey: userQueries.allPersonasKey(),
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Title className={titleStyle}>{t('edit-product')}</Dialog.Title>
        <input
          className={inputStyle}
          placeholder="Type price..."
          type="number"
          value={Boolean(price) ? price : ''}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <div className={buttonWrapperStyle}>
          <Button onClick={onSave} variant="secondary" size="m">
            Save
          </Button>
          <Button onClick={onDelete} variant="primary" size="m">
            Delete
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

export default EditModal;
