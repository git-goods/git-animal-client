'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { auctionQueries, useChangeProductPrice, useDeleteProduct, userQueries } from '@gitanimals/react-query';
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
        <Dialog.Title className="glyph20-regular text-left text-white-100 w-full">{t('edit-product')}</Dialog.Title>
        <input
          className={inputStyle}
          placeholder="Type price..."
          type="number"
          value={Boolean(price) ? price : ''}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <div className="flex justify-end gap-[8px] w-full">
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

const inputStyle =
  'flex h-[55px] pt-[14px] pr-[14px] pb-[13px] pl-[20px] items-start gap-[8px] w-full outline-none rounded-[8px] border border-[rgba(255,255,255,0.25)] glyph16-regular text-white-100 placeholder:glyph16-regular placeholder:text-white-75 [&::-webkit-outer-spin-button]:[-webkit-appearance:none] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:[-webkit-appearance:none] [&::-webkit-inner-spin-button]:m-0';
