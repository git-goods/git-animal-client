'use client';

import Image from 'next/image';
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
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

function ShopTableRowMobileView({ onAction, actionLabel, actionColor, dropRate, ...item }: Props) {
  return (
    <div className={rowStyle}>
      <Image
        className={imageStyle}
        src={getPersonaImage(item.persona.personaType)}
        width={60}
        height={67}
        alt="animal1"
      />
      <Flex direction="column" style={{ flex: 1 }}>
        <span className={rowTitleStyle}>{snakeToTitleCase(item.persona.personaType)}</span>
        <div className={rowContentStyle}>
          <span>
            {ANIMAL_TIER_TEXT_MAP[getAnimalTierInfo(Number(dropRate.replace('%', '')))]}
            <span>/</span>
          </span>
          <span>Lv.{item.persona.personaLevel}</span>
          <span>/</span>
          <span>{addNumberComma(item.price)}P</span>
        </div>
      </Flex>
      <div>
        <Button
          variant="secondary"
          size="s"
          className={buttonStyle}
          onClick={() => onAction(item.id)}
          color={actionColor}
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}

export default ShopTableRowMobileView;

export const rowStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  width: '100%',
  height: '100%',
  padding: '4px 16px 4px 8px',
});

export const rowTitleStyle = css({
  textStyle: 'glyph15.regular',
  color: 'white.white_100',
});

export const rowContentStyle = css({
  display: 'flex',
  flexDirection: 'row',
  gap: '4px',
  textStyle: 'glyph14.regular',
  color: 'white.white_50',
});

export const imageStyle = css({
  width: 'auto',
  height: '56px',
  objectFit: 'contain',
});

export const buttonStyle = css({
  width: '80px',
});
