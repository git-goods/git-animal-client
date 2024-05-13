import Image from 'next/image';
import styled from 'styled-components';

import { useGetProducts } from '@/apis/auctions/useGetProducts';
import type { ProductStatusType } from '@/schema/action';

import SmallButton from './SmallButton';

function ShopTable() {
  const { data } = useGetProducts();
  console.log('data: ', data);

  return (
    <Bg>
      <TableStyled>
        {data?.products.map((item, index) => (
          <div className="row" key={index}>
            <div>
              <Image src="/shop/cat.png" width={60} height={67} alt="animal1" />
            </div>
            <div>{item.persona.personaType}</div>
            <div>{item.persona.personaLevel}</div>
            <div>{item.price}</div>
            <div>
              <ActionButton paymentState={item.paymentState} onClick={() => null} />
            </div>
          </div>
        ))}
      </TableStyled>
    </Bg>
  );
}

export default ShopTable;

const PAYMENT_STATE_BUTTON_TEXT: Record<ProductStatusType, string> = {
  ON_SALE: 'buy!',
  SOLD_OUT: 'cancel!',
};

function ActionButton({ paymentState, onClick }: { paymentState: ProductStatusType; onClick: () => void }) {
  return <SmallButton onClick={onClick}>{PAYMENT_STATE_BUTTON_TEXT[paymentState]}</SmallButton>;
}

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

    > div:nth-child(2),
    > div:nth-child(3),
    > div:nth-child(4) {
      padding-right: 12px;
      padding-left: 16px;
      padding-bottom: 0;
      padding-top: 4px;
      justify-content: flex-start;
    }
  }
`;
