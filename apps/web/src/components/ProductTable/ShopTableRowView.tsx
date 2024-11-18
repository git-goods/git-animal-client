'use client';

import Image from 'next/image';
import { css, cx } from '_panda/css';
import type { Product } from '@gitanimals/api/src/auction';
import { Button } from '@gitanimals/ui-panda';
import { snakeToTitleCase } from '@gitanimals/util-common';

import { useGetAllPersona } from '@/hooks/query/render/useGetAllPersona';
import { ANIMAL_TIER_TEXT_MAP, getAnimalTierInfo } from '@/utils/animals';
import { getPersonaImage } from '@/utils/image';
import { addNumberComma } from '@/utils/number';

interface Props extends Pick<Product, 'id' | 'persona' | 'price'> {
  onAction: (itemId: Product['id']) => void;
  actionLabel: string;
  actionColor: string;
}

function ShopTableRowView({ onAction, actionLabel, actionColor, ...item }: Props) {
  const {
    data: { personas },
  } = useGetAllPersona();

  const currentPersona = personas.find((persona) => persona.type === item.persona.personaType);

  if (!currentPersona) throw new Error('unexpected persona');

  return (
    <div className={rowStyle} key={item.id}>
      <div>
        <Image src={getPersonaImage(item.persona.personaType)} width={60} height={67} alt="animal1" />
      </div>
      <span>{snakeToTitleCase(item.persona.personaType)}</span>
      <span>{ANIMAL_TIER_TEXT_MAP[getAnimalTierInfo(Number(currentPersona.dropRate.replace('%', '')))]}</span>
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
