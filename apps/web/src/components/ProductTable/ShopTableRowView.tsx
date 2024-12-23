'use client';

import Image from 'next/image';
import { css, cx } from '_panda/css';
import type { Product } from '@gitanimals/api/src/auction';
import { Button, Table } from '@gitanimals/ui-panda';
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
    <Table.Row className={rowStyle} key={item.id}>
      <Table.Cell>
        <Image src={getPersonaImage(item.persona.personaType)} width={60} height={67} alt="animal1" />
      </Table.Cell>
      <Table.Cell>{snakeToTitleCase(item.persona.personaType)}</Table.Cell>
      <Table.Cell>
        {ANIMAL_TIER_TEXT_MAP[getAnimalTierInfo(Number(currentPersona.dropRate.replace('%', '')))]}
      </Table.Cell>
      <Table.Cell>{item.persona.personaLevel}</Table.Cell>
      <Table.Cell>{addNumberComma(item.price)}</Table.Cell>
      <Table.Cell>
        <Button variant="secondary" onClick={() => onAction(item.id)} color={actionColor}>
          {actionLabel}
        </Button>
      </Table.Cell>
    </Table.Row>
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
  '& *': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});
