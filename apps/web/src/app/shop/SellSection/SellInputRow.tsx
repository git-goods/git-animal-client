/* eslint-disable @next/next/no-img-element */
import type { ChangeEventHandler } from 'react';
import React, { useState } from 'react';
import { css, cx } from '_panda/css';
import { useQueryClient } from '@tanstack/react-query';

import { useRegisterProduct } from '@/apis/auctions/useRegisterProduct';
import SmallButton from '@/components/Button/SmallButton';
import { rowStyle } from '@/components/ProductTable/ShopTableRowView';
import { useSnackBar } from '@/components/SnackBar/useSnackBar';
import { ACTION_BUTTON_OBJ } from '@/constants/action';
import type { PetInfoSchema } from '@/schema/user';
import { getPersonaImage } from '@/utils/image';

const MAX_PRICE = 100_000_000;

function SellInputRow({ item, initPersona }: { item?: PetInfoSchema; initPersona: () => void }) {
  const { showSnackBar } = useSnackBar();
  const { price, resetPrice, onChangePriceInput } = usePrice();

  const queryClient = useQueryClient();

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

      showSnackBar({ message: '판매 등록이 완료되었습니다.' });
    },
  });

  const onSellClick = async () => {
    try {
      if (!item) throw new Error('Item is not found');
      if (!price) throw new Error('가격을 입력해주세요. ');

      mutate({ personaId: item.id, price });
    } catch (error: unknown) {
      if (error instanceof Error) showSnackBar({ message: error.message });
    }
  };

  if (!item) return <div className={containerStyle} />;

  return (
    <div className={containerStyle}>
      <div className={cx(rowStyle, 'row')} key={item.id}>
        <div>
          <img src={getPersonaImage(item.type)} alt={item.type} width={60} height={67} />
        </div>
        <div>{item.type}</div>
        <div>{item.level}</div>
        <div>
          <input
            className={inputStyle}
            inputMode="numeric"
            placeholder="Type price..."
            value={price}
            onChange={onChangePriceInput}
          />
        </div>
        <div>
          <SmallButton color={ACTION_BUTTON_OBJ.SELL.color} onClick={onSellClick}>
            {ACTION_BUTTON_OBJ.SELL.label}
          </SmallButton>
        </div>
      </div>
    </div>
  );
}

export default SellInputRow;

const containerStyle = css({
  height: '84px',
  backgroundImage: 'url(/shop/table-bg-row.png)',
  backgroundSize: 'cover',
});

const inputStyle = css({
  width: '100%',
  height: '100%',
  minHeight: '64px',
  fontSize: '20px',
  fontWeight: 700,
  border: 'none',
  outline: 'none',

  '&::placeholder': {
    color: 'gray',
    fontSize: '20px',
    fontWeight: 700,
  },

  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
});

function usePrice() {
  const INITIAL_VALUE = 0;

  const [price, setPrice] = useState(INITIAL_VALUE);

  const resetPrice = () => setPrice(INITIAL_VALUE);

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
