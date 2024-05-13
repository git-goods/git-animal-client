import React from 'react';
import styled from 'styled-components';

import type { ProductSchema } from '@/schema/action';

import ShopTableRow from '../ShopTableRow';

function ShopRow({ item }: { item?: ProductSchema }) {
  if (!item) return <Container />;

  return (
    <Container>
      <ShopTableRow item={item} />
    </Container>
  );
}

export default ShopRow;

const Container = styled.div`
  height: 84px;
  background-image: url('/shop/table-bg-row.png');
  background-size: cover;
`;
