import styled from 'styled-components';

import type { ProductItemType } from '@/schema/action';

import ShopTableRow from './ShopTableRow';

/**
 * @deprecated
 */
function ShopTable({ list }: { list: ProductItemType[] }) {
  return (
    <Bg>
      <TableStyled>
        {list.map((item) => (
          <ShopTableRow item={item} key={item.id} />
        ))}
      </TableStyled>
    </Bg>
  );
}

export default ShopTable;

const Bg = styled.div`
  height: 644px;
  background-image: url('/shop/table-bg.png');
  background-size: cover;
`;

const TableStyled = styled.div`
  border-collapse: collapse;
  width: 100%;
  height: fit-content;

  vertical-align: center;
`;
