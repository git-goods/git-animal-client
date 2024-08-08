/* eslint-disable @next/next/no-img-element */
import type { ChangeEventHandler } from 'react';
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import { useRegisterProduct } from '@/apis/auctions/useRegisterProduct';
import { Row } from '@/components/ProductTable/ShopTableRowView';
import { useSnackBar } from '@/components/SnackBar/useSnackBar';
import { ACTION_BUTTON_OBJ } from '@/constants/action';
import { STATIC_IMAGE_URL } from '@/constants/outlink';
import type { PetInfoSchema } from '@/schema/user';

import SmallButton from '../../../components/Button/SmallButton';

const MAX_PRICE = 100_000_000;

function SellInputRow({ item, initPersona }: { item?: PetInfoSchema; initPersona: () => void }) {
  const { showSnackBar } = useSnackBar();

  const [price, setPrice] = useState(0);

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
      setPrice(0);

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

  if (!item) return <Container />;

  return (
    <Container>
      <RowStyled className="row" key={item.id}>
        <div>
          <img src={`${STATIC_IMAGE_URL}/${item.type}`} alt={item.type} width={60} height={67} />
        </div>
        <div>{item.type}</div>
        <div>{item.level}</div>
        <div>
          <input inputMode="numeric" placeholder="Type price..." value={price} onChange={onChangePriceInput} />
        </div>
        <div>
          <SmallButton color={ACTION_BUTTON_OBJ.SELL.color} onClick={onSellClick}>
            {ACTION_BUTTON_OBJ.SELL.label}
          </SmallButton>
        </div>
      </RowStyled>
    </Container>
  );
}

export default SellInputRow;

const Container = styled.div`
  height: 84px;
  background-image: url('/shop/table-bg-row.png');
  background-size: cover;
`;

const RowStyled = styled(Row)`
  input {
    width: 100%;
    height: 100%;
    min-height: 64px;
    font-size: 20px;
    font-weight: 700;
    border: none;
    outline: none;

    &::placeholder {
      color: gray;
      font-size: 20px;
      font-weight: 700;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox  */
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }
`;
