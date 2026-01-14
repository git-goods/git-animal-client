/* eslint-disable @next/next/no-img-element */
import type { ChangeEventHandler } from 'react';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Persona } from '@gitanimals/api';
import useIsMobile from '@gitanimals/react/src/hooks/useIsMobile/useIsMobile';
import { auctionQueries, userQueries } from '@gitanimals/react-query';
import { cn } from '@gitanimals/ui-tailwind';
import { Button, Dialog } from '@gitanimals/ui-tailwind';
import { snakeToTitleCase } from '@gitanimals/util-common';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useRegisterProduct } from '@/apis/auctions/useRegisterProduct';
import { useGetPersonaTier } from '@/hooks/persona/useGetPersonaDropRate';
import { ANIMAL_TIER_TEXT_MAP } from '@/utils/animals';
import { getPersonaImage } from '@/utils/image';

import { rowStyle, ShopTableMobileRow } from '../../_common/ShopTableMobileRow';
import { tableCss, theadCss } from '../table.styles';

const MAX_PRICE = 100_000_000;

interface Props {
  item: Persona;
  initPersona: () => void;
}

function SellInputRow({ item, initPersona }: Props) {
  const t = useTranslations('Shop');
  const isMobile = useIsMobile();
  const { price, resetPrice, onChangePriceInput } = usePrice();
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

  if (isMobile) {
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

  return (
    <div className={tableCss}>
      <div className={theadCss}>
        <span>{t('pet')}</span>
        <span>{t('name')}</span>
        <span>{t('grade')}</span>
        <span>{t('level')}</span>
        <span>{t('price')}</span>
        <span></span>
      </div>

      <div className={cn(rowStyle, 'row')}>
        {item && personaTier && (
          <>
            <div>
              <img src={getPersonaImage(item.type)} alt={item.type} width={60} height={67} />
            </div>
            <div>{snakeToTitleCase(item.type)}</div>
            <div>{ANIMAL_TIER_TEXT_MAP[personaTier]}</div>
            <div>{item.level}</div>
            <div>
              <input
                className={cn(
                  'font-product text-glyph-20',
                  'w-full h-full min-h-16 text-xl font-bold',
                  'border-none outline-none',
                  'placeholder:text-glyph-20 placeholder:text-white/25',
                  '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0'
                )}
                inputMode="numeric"
                placeholder={t('price-you-want')}
                value={price}
                onChange={onChangePriceInput}
              />
            </div>
            <Button variant="secondary" onClick={onSellClick}>
              {t('sell')}
            </Button>
          </>
        )}
      </div>
    </div>
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
  const t = useTranslations('Shop');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Title>{t('sell-price-modal-title')}</Dialog.Title>
        <input
          className={cn(
            'flex h-[55px] py-3.5 pl-5 pr-3.5',
            'items-start gap-2 w-full outline-none',
            'rounded-lg border border-white/25',
            'font-product text-glyph-16 text-white',
            'placeholder:text-glyph-16 placeholder:text-white/75',
            '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0'
          )}
          placeholder="Type price..."
          type="number"
          value={Boolean(sellPrice) ? sellPrice : ''}
          onChange={(e) => setSellPrice(Number(e.target.value))}
        />
        <div className="flex justify-end gap-2 w-full">
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
