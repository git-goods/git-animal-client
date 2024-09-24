/* eslint-disable @next/next/no-img-element */
import type { ChangeEventHandler } from 'react';
import React, { useState } from 'react';
import { css, cx } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useRegisterProduct } from '@/apis/auctions/useRegisterProduct';
import { rowStyle } from '@/components/ProductTable/ShopTableRowView';
import { ACTION_BUTTON_OBJ } from '@/constants/action';
import { useGetAllPersona } from '@/hooks/query/render/useGetAllPersona';
import type { PetInfoSchema } from '@/schema/user';
import { ANIMAL_TIER_TEXT_MAP, getAnimalTierInfo } from '@/utils/animals';
import { getPersonaImage } from '@/utils/image';

import { tableCss, theadCss } from '../table.styles';

const MAX_PRICE = 100_000_000;

interface Props {
  item: PetInfoSchema | null;
  initPersona: () => void;
}

function SellInputRow({ item, initPersona }: Props) {
  const { price, resetPrice, onChangePriceInput } = usePrice();

  const queryClient = useQueryClient();

  const {
    data: { personas },
  } = useGetAllPersona();
  const currentPersona = personas.find((persona) => persona.type === item?.type);

  const { mutate } = useRegisterProduct({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users', 'all-pet'], // TODO: getAllPetsQueryKey
      });
      queryClient.invalidateQueries({
        queryKey: ['my', 'products'], //getMyProductsQueryKey(),
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

  return (
    <div className={tableCss}>
      <div className={theadCss}>
        <span>Pet</span>
        <span>Name</span>
        <span>Grade</span>
        <span>Level</span>
        <span>Price</span>
        <span></span>
      </div>

      <div className={cx(rowStyle, 'row')}>
        {item && currentPersona && (
          <>
            <div>
              <img src={getPersonaImage(item.type)} alt={item.type} width={60} height={67} />
            </div>
            <div>{item.type}</div>
            <div>{ANIMAL_TIER_TEXT_MAP[getAnimalTierInfo(Number(currentPersona.dropRate.replace('%', '')))]}</div>
            <div>{item.level}</div>
            <div>
              <input
                className={inputStyle}
                inputMode="numeric"
                placeholder="price you want"
                value={price}
                onChange={onChangePriceInput}
              />
            </div>
            <Button variant="secondary" onClick={onSellClick}>
              {ACTION_BUTTON_OBJ.SELL.label}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default SellInputRow;

const containerStyle = css({
  height: '84px',
  marginBottom: 32,
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
