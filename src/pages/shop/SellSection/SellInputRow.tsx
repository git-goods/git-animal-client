/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styled from 'styled-components';

import { STATIC_IMAGE_URL } from '@/constants/outlink';
import type { PetInfoSchema } from '@/schema/user';

import ActionButton from '../ActionButton';
import { Row } from '../ShopTableRow';

function SellInputRow({ item }: { item?: PetInfoSchema }) {
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
          <input type="number" placeholder="Type price..." />
        </div>
        <div>
          <ActionButton paymentState="SELL" onClick={() => null} />
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
