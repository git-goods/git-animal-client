import Image from 'next/image';
import { css } from '_panda/css';
import type { Product } from '@gitanimals/api/src/auction';
import styled from 'styled-components';

import SmallButton from '@/components/Button/SmallButton';
import { getPersonaImage } from '@/utils/image';

interface Props extends Pick<Product, 'id' | 'persona' | 'price'> {
  onAction: (itemId: Product['id']) => void;
  actionLabel: string;
  actionColor: string;
}

function ShopTableRowView({ onAction, actionLabel, actionColor, ...item }: Props) {
  return (
    <Row className="row" key={item.id}>
      <div>
        <Image src={getPersonaImage(item.persona.personaType)} width={60} height={67} alt="animal1" />
      </div>
      <div>{item.persona.personaType}</div>
      <div>{item.persona.personaLevel}</div>
      <div>{item.price}</div>
      <div>
        <SmallButton onClick={() => onAction(item.id)} color={actionColor}>
          {actionLabel}
        </SmallButton>
      </div>
    </Row>
  );
}

export default ShopTableRowView;

export const Row = styled.div`
  animation: fadeIn 0.3s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  display: grid;
  grid-template-columns: 82px 214px 181px 360px 122px;
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

export const rowStyle = css({
  animation: 'fadeIn 0.3s',

  display: 'grid',
  gridTemplateColumns: '82px 214px 181px 360px 122px',
  verticalAlign: 'center',
  height: '82px',
  alignItems: 'center',
  '& > div': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    paddingRight: '4px',
  },
  '& > div:nth-child(1)': {
    paddingBottom: 0,
  },
  '& > div:nth-child(2), & > div:nth-child(3), & > div:nth-child(4)': {
    paddingRight: '12px',
    paddingLeft: '16px',
    paddingBottom: 0,
    paddingTop: '4px',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
    flex: 0,
    minWidth: 0,
    maxWidth: '100%',
  },
});
