import React from 'react';
import { cn } from '@gitanimals/ui-tailwind/utils';

import { AnimalCard } from '@/components/AnimalCard';

const ANIMAL_LIST = [
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0.7%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0.02%',
  },
  {
    type: 'LITTLE_CHICK',
    dropRate: '0.01%',
  },
  {
    type: 'GOBLIN_BAG',
    dropRate: '0.13%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '10%',
  },
  {
    type: 'GOOSE',
    dropRate: '10%',
  },
  {
    type: 'FISH_MAN',
    dropRate: '10%',
  },
  {
    type: 'GOBLIN',
    dropRate: '10%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '10%',
  },
  {
    type: 'LITTLE_CHICK',
    dropRate: '10%',
  },
  {
    type: 'LITTLE_CHICK',
    dropRate: '10%',
  },
];

function AnimalCardContainer() {
  return (
    <div className={container}>
      {ANIMAL_LIST.map((animal, index) => {
        return <AnimalCard key={index} type={animal.type} dropRate={animal.dropRate} />;
      })}
    </div>
  );
}

export default AnimalCardContainer;

const container = cn(
  'grid gap-5 justify-center grid-cols-[repeat(4,1fr)] w-[1120px] h-[1024px]'
);
