import Image from 'next/image';
import styled from 'styled-components';

import type { Product } from '@/schema/action';
import { getPersonaImage } from '@/utils/image';

import ActionButton from './ActionButton';

function ShopTableRow({ item }: { item: Product }) {
  return (
    <Row className="row" key={item.id}>
      <div>
        <Image src={getPersonaImage(item.persona.personaType)} width={60} height={67} alt="animal1" />
      </div>
      <div>{item.persona.personaType}</div>
      <div>{item.persona.personaLevel}</div>
      <div>{item.price}</div>
      <div>
        <ActionButton paymentState={item.paymentState} onClick={() => null} />
      </div>
    </Row>
  );
}

export default ShopTableRow;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 82px 209px 178px 354px 120px;
  vertical-align: center;
  height: 82px;
  align-items: center;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 20px;
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
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    flex: 0;
    min-width: 0%;
    max-width: 100%;
  }
`;
