/* eslint-disable @next/next/no-img-element */
import type { ChangeEventHandler } from 'react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Persona } from '@gitanimals/api';
import { auctionQueries, userQueries } from '@gitanimals/react-query';
import { Button, Dialog } from '@gitanimals/ui-tailwind';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ShopTableMobileRow } from '../../_common/ShopTableMobileRow';

import { useRegisterProduct } from './useRegisterProduct';

const MAX_PRICE = 100_000_000;

interface Props {
  item: Persona;
  initPersona: () => void;
}

const mobilePriceinputStyle =
  'flex h-[55px] w-full items-start gap-2 rounded-lg border border-white/25 py-[14px] pl-5 pr-[14px] pb-[13px] pt-[14px] text-glyph-16 font-normal text-white-100 outline-none ' +
  'placeholder:text-glyph-16 placeholder:font-normal placeholder:text-white/75 ' +
  '[&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none';

const buttonWrapperStyle = 'flex w-full justify-end gap-2';

function SellInputRow({ item, initPersona }: Props) {
  const { t } = useTranslation('shop');
  const { resetPrice } = usePrice();
  const [isSellPriceModalOpen, setIsSellPriceModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useRegisterProduct({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueries.allPersonasKey() });
      queryClient.invalidateQueries({ queryKey: auctionQueries.myProductsKey() });

      initPersona();
      resetPrice();

      toast.success('판매 등록이 완료되었습니다.');
    },
  });

  return (
    <>
      <SellPriceModal
        isOpen={isSellPriceModalOpen}
        onClose={() => setIsSellPriceModalOpen(false)}
        onAction={(price) => {
          mutate({ personaId: item.id, price });
        }}
      />
      <ShopTableMobileRow
        personaType={item.type}
        personaLevel={Number(item.level)}
        rightElement={
          <Button
            variant="secondary"
            size="s"
            onClick={() => {
              setIsSellPriceModalOpen(true);
            }}
          >
            {t('sell')}
          </Button>
        }
      />
    </>
  );
}

export default SellInputRow;

function SellPriceModal({
  isOpen,
  onClose,
  onAction,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAction: (price: number) => void;
}) {
  const [sellPrice, setSellPrice] = useState<number | undefined>();
  const { t } = useTranslation('shop');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Title>{t('sell-price-modal-title')}</Dialog.Title>
        <input
          className={mobilePriceinputStyle}
          placeholder="Type price..."
          type="number"
          value={Boolean(sellPrice) ? sellPrice : ''}
          onChange={(e) => setSellPrice(Number(e.target.value))}
        />
        <div className={buttonWrapperStyle}>
          <Button onClick={onClose} variant="secondary" size="m">
            Cancle
          </Button>
          <Button onClick={() => sellPrice && onAction(sellPrice)} variant="primary" size="m" disabled={!sellPrice}>
            Sell
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

function usePrice() {
  const [price, setPrice] = useState<number | undefined>();

  const resetPrice = () => setPrice(undefined);

  const onChangePriceInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const parsedValue = Number(value);

    if (Number.isNaN(parsedValue)) {
      return;
    }

    if (MAX_PRICE < parsedValue) {
      setPrice(MAX_PRICE);
      return;
    }

    setPrice(parsedValue);
  };

  return { price, onChangePriceInput, resetPrice };
}
