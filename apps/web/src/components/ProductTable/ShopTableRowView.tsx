'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { css, cx } from '_panda/css';
import type { Product } from '@gitanimals/api/src/auction';
import { snakeToTitleCase } from '@gitanimals/util-common';

import { useGetPersonaTier } from '@/hooks/persona/useGetPersonaDropRate';
import { ANIMAL_TIER_TEXT_MAP } from '@/utils/animals';
import { getPersonaImage } from '@/utils/image';
import { addNumberComma } from '@/utils/number';

interface Props extends Pick<Product, 'id' | 'persona' | 'price'> {
  rightElement: ReactNode;
}

function ShopTableRowView({ rightElement, ...item }: Props) {
  const tier = useGetPersonaTier(item.persona.personaType);

  return (
    <div className={rowStyle} key={item.id}>
      <div>
        <Image src={getPersonaImage(item.persona.personaType)} width={60} height={67} alt="animal1" />
      </div>
      <span>{snakeToTitleCase(item.persona.personaType)}</span>
      <span>{ANIMAL_TIER_TEXT_MAP[tier]}</span>
      <span>{item.persona.personaLevel}</span>
      <span>{addNumberComma(item.price)}</span>
      <div>{rightElement}</div>
    </div>
  );
}

export default ShopTableRowView;

export function ShopTableRowViewSkeleton() {
  return <div className={cx(rowStyle, skeletonStyle)} />;
}

const skeletonStyle = css({
  background:
    'linear-gradient(90deg, token(colors.gray.800) 25%, token(colors.gray.600) 50%, token(colors.gray.200) 75%, token(colors.gray.800) 100%)',
  backgroundSize: '200% 100%',
  animation: `skeletonLoading 1.5s infinite linear`,
});

export const rowStyle = css({
  width: '100%',
  height: '80px',
  backgroundColor: 'white_10',
  borderRadius: '12px',

  display: 'grid',
  gridTemplateColumns: '1fr 2.5fr 1fr 1fr 4.2fr 1.5fr',
  alignItems: 'center',
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
