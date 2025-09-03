/* eslint-disable @next/next/no-img-element */
import type { ChangeEventHandler } from 'react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { css, cx } from '_panda/css';
import type { Persona } from '@gitanimals/api';
import { auctionQueries, userQueries } from '@gitanimals/react-query';
import { Button, Dialog } from '@gitanimals/ui-panda';
import { snakeToTitleCase } from '@gitanimals/util-common';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useGetPersonaTier } from '@/hooks/persona/useGetPersonaDropRate';
import { ANIMAL_TIER_TEXT_MAP } from '@/utils/animals';
import { getPersonaImage } from '@/utils/image';

import { rowStyle, ShopTableMobileRow } from '../../_common/ShopTableMobileRow';
import { tableCss, theadCss } from '../table.styles';
import { useRegisterProduct } from './useRegisterProduct';

const MAX_PRICE = 100_000_000;

interface Props {
  item: Persona;
  initPersona: () => void;
}

function SellInputRow({ item, initPersona }: Props) {
  const { t } = useTranslation('shop');
  const { price, resetPrice } = usePrice();
  const [isSellPriceModalOpen, setIsSellPriceModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const personaTier = useGetPersonaTier(item.type);

  const { mutate } = useRegisterProduct({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueries.allPersonasKey() });
      queryClient.invalidateQueries({ queryKey: auctionQueries.myProductsKey() });

      initPersona();
      resetPrice();

      toast.success('판매 등록이 완료되었습니다.');
    },
  });

  const onSellClick = async () => {
    try {
      if (!item) throw new Error('Item is not found');
      if (!price) throw new Error('가격을 입력해주세요. ');

      mutate({ personaId: item.id, price });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

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
              console.log('onClick: ');
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

const mobilePriceinputStyle = css({
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
  width: '100%',
});

const inputStyle = css({
  textStyle: 'glyph20.regular',

  width: '100%',
  height: '100%',
  minHeight: '64px',
  fontSize: '20px',
  fontWeight: 700,
  border: 'none',
  outline: 'none',

  '&::placeholder': {
    textStyle: 'glyph20.regular',
    color: 'white.white_25',
  },

  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
});

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
