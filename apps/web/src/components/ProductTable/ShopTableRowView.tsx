'use client';

import Image from 'next/image';
import { css } from '_panda/css';
import type { Product } from '@gitanimals/api/src/auction';
import { Button } from '@gitanimals/ui-panda';

import { getPersonaImage } from '@/utils/image';

interface Props extends Pick<Product, 'id' | 'persona' | 'price'> {
  onAction: (itemId: Product['id']) => void;
  actionLabel: string;
  actionColor: string;
}

function ShopTableRowView({ onAction, actionLabel, actionColor, ...item }: Props) {
  return (
    <div className={rowStyle} key={item.id}>
      <div>
        <Image src={getPersonaImage(item.persona.personaType)} width={60} height={67} alt="animal1" />
      </div>
      <span>{item.persona.personaType}</span>
      <span>B-</span>
      <span>{item.persona.personaLevel}</span>
      <span>{item.price}</span>
      <div>
        <Button variant="secondary" onClick={() => onAction(item.id)} color={actionColor}>
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}

export default ShopTableRowView;

export const rowStyle = css({
  width: '100%',
  height: 80,
  backgroundColor: 'white_10',
  borderRadius: 12,

  display: 'grid',
  gridTemplateColumns: '1fr 2.5fr 1fr 1fr 4.2fr 1.5fr',
  alignItems: 'center',
  padding: '0 32px',
  gap: 16,

  textStyle: 'glyph20.regular',
  color: 'white.white_100',

  '& button': {
    color: 'black.black',
  },

  '& *': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});
