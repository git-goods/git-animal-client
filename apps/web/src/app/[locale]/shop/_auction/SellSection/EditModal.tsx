'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { auctionQueries, useChangeProductPrice, useDeleteProduct, userQueries } from '@gitanimals/react-query';
import { cn } from '@gitanimals/ui-tailwind';
import { Button, Dialog } from '@gitanimals/ui-tailwind';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

function EditModal({ isOpen, onClose, productId }: { isOpen: boolean; onClose: () => void; productId?: string }) {
  const queryClient = useQueryClient();
  const t = useTranslations('Shop');

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

const titleStyle = cn(
  'font-product text-glyph-20 text-left text-white w-full'
);

const inputStyle = cn(
  'flex h-[55px] py-3.5 pl-5 pr-3.5',
  'items-start gap-2 w-full outline-none',
  'rounded-lg border border-white/25',
  'font-product text-glyph-16 text-white',
  'placeholder:text-glyph-16 placeholder:text-white/75',
  '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0'
);

const buttonWrapperStyle = cn(
  'flex justify-end gap-2 w-full'
);
