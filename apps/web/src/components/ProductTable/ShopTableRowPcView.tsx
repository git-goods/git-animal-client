'use client';

import Image from 'next/image';
import { css } from '_panda/css';
import type { Product } from '@gitanimals/api/src/auction';
import { Button } from '@gitanimals/ui-panda';
import { snakeToTitleCase } from '@gitanimals/util-common';

import { ANIMAL_TIER_TEXT_MAP, getAnimalTierInfo } from '@/utils/animals';
import { getPersonaImage } from '@/utils/image';
import { addNumberComma } from '@/utils/number';

interface Props extends Pick<Product, 'id' | 'persona' | 'price'> {
  onAction: (itemId: Product['id']) => void;
  actionLabel: string;
  actionColor: string;
  dropRate: string;
}

function ShopTableRowPcView({ onAction, actionLabel, actionColor, dropRate, ...item }: Props) {
  return (
    <div className={rowStyle}>
      <Image
        className={imageStyle}
        src={getPersonaImage(item.persona.personaType)}
        width={80}
        height={80}
        alt="animal1"
      />
      <span>{snakeToTitleCase(item.persona.personaType)}</span>
      <span>{ANIMAL_TIER_TEXT_MAP[getAnimalTierInfo(Number(dropRate.replace('%', '')))]}</span>
      <span>{item.persona.personaLevel}</span>
      <span>{addNumberComma(item.price)}</span>
      <div>
        <Button variant="secondary" onClick={() => onAction(item.id)} color={actionColor}>
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}

export default ShopTableRowPcView;

export const rowStyle = css({
  display: 'grid',
  gridTemplateColumns: '1fr 2.5fr 1fr 1fr 4.2fr 1.5fr',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: '0 32px',
  gap: '16px',

  textStyle: 'glyph20.regular',
  color: 'white.white_100',

  '& button': {
    color: 'black.black',
    width: '100%',
    paddingX: '6px',
  },

  '& *': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

export const imageStyle = css({
  width: 'auto',
  height: '80px',
  objectFit: 'contain',
});
