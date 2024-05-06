import Image from 'next/image';
import styled from 'styled-components';

import SmallButton from './SmallButton';

const List = [
  {
    name: 'CHEESE_CAT',
    level: 2147483647,
    price: 922337203685477,
    status: 'ON_SALE',
  },
  {
    name: 'CHEESE_CAT',
    level: 2147483647,
    price: 922337203685477,
    status: 'ON_SALE',
  },
  {
    name: 'CHEESE_CAT',
    level: 2147483647,
    price: 922337203685477,
    status: 'ON_SALE',
  },
  {
    name: 'CHEESE_CAT',
    level: 2147483647,
    price: 922337203685477,
    status: 'ON_SALE',
  },
  {
    name: 'CHEESE_CAT',
    level: 2147483647,
    price: 922337203685477,
    status: 'ON_SALE',
  },
];

function ShopTable() {
  return (
    <Bg>
      <TableStyled>
        {List.map((item, index) => (
          <div className="row" key={index}>
            <div>
              <Image src="/shop/cat.png" width={60} height={67} alt="animal1" />
            </div>
            <div>{item.name}</div>
            <div>{item.level}</div>
            <div>{item.price}</div>
            <div>
              <SmallButton>{item.status}</SmallButton>
            </div>
          </div>
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

  .row {
    display: grid;
    grid-template-columns: 82px 209px 178px 354px 120px;
    height: 82px;
    align-items: center;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 20px;
      padding-bottom: 6px;
      padding-right: 4px;
    }
    > div:nth-child(1) {
      padding-bottom: 0;
    }
  }
`;
