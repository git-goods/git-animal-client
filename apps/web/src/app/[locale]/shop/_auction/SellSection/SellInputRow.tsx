/* eslint-disable @next/next/no-img-element */
import type { ChangeEventHandler } from 'react';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Persona } from '@gitanimals/api';
import useIsMobile from '@gitanimals/react/src/hooks/useIsMobile/useIsMobile';
import { auctionQueries, userQueries } from '@gitanimals/react-query';
import { Button, cn, Dialog } from '@gitanimals/ui-tailwind';
import { snakeToTitleCase } from '@gitanimals/util-common';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useRegisterProduct } from '@/apis/auctions/useRegisterProduct';
import { useGetPersonaTier } from '@/hooks/persona/useGetPersonaDropRate';
import { trackEvent } from '@/lib/analytics';
import { ANIMAL_TIER_TEXT_MAP } from '@/utils/animals';
import { useClientUser } from '@/utils/clientAuth';
import { getPersonaImage } from '@/utils/image';

import { rowStyle, ShopTableMobileRow } from '../../_common/ShopTableMobileRow';

const MAX_PRICE = 100_000_000;

const tableCss = 'w-full mb-[32px] mobile:mb-[12px]';
const theadCss =
  'grid grid-cols-[1fr_2.5fr_1fr_1fr_4.2fr_1.5fr] gap-[16px] px-[32px] py-[4px] rounded-[12px] bg-white-50 items-center h-[46px] glyph18-bold text-white-100 mb-[4px] [&>span:nth-child(1)]:text-center mobile:hidden';

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
  const { id: myId } = useClientUser();

  const personaTier = useGetPersonaTier(item.type);

  const { mutate } = useRegisterProduct({
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: userQueries.allPersonasKey() });
      queryClient.invalidateQueries({ queryKey: auctionQueries.myProductsKey() });

      trackEvent('click_pet_sell', {
        pet_name: item.type,
        pet_price: variables.price,
        pet_grade: ANIMAL_TIER_TEXT_MAP[personaTier],
        pet_level: Number(item.level),
        page_name: 'shop',
        location: 'auction_my_pet',
        seller_id: String(myId),
      });

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
                className={inputStyle}
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

const mobilePriceinputStyle =
  'flex h-[55px] pt-[14px] pr-[14px] pb-[13px] pl-[20px] items-start gap-[8px] w-full outline-none rounded-[8px] border border-[rgba(255,255,255,0.25)] glyph16-regular text-white-100 placeholder:glyph16-regular placeholder:text-white-75 [&::-webkit-outer-spin-button]:[-webkit-appearance:none] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:[-webkit-appearance:none] [&::-webkit-inner-spin-button]:m-0';

const buttonWrapperStyle = 'flex justify-end gap-[8px] w-full';

const inputStyle =
  'glyph20-regular w-full h-full min-h-[64px] text-[20px] font-bold border-none outline-none placeholder:glyph20-regular placeholder:text-white-25 [&::-webkit-outer-spin-button]:[-webkit-appearance:none] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:[-webkit-appearance:none] [&::-webkit-inner-spin-button]:m-0';

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
