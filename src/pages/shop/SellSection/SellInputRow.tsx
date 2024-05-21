/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import styled from 'styled-components';

import { useRegisterProduct } from '@/apis/auctions/useRegisterProduct';
import { STATIC_IMAGE_URL } from '@/constants/outlink';
import type { PetInfoSchema } from '@/schema/user';

import ActionButton from '../ActionButton';
import { Row } from '../ShopTableRow';

function SellInputRow({ item }: { item?: PetInfoSchema }) {
  const [price, setPrice] = useState(0);
  const { mutate } = useRegisterProduct();

  const onSellClick = async () => {
    if (!item) return;
    if (!price) return;

    mutate({ personaId: item.id, price });
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
          <input
            type="number"
            placeholder="Type price..."
            value={price ? price : ''}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <ActionButton paymentState="SELL" onClick={onSellClick} />
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
