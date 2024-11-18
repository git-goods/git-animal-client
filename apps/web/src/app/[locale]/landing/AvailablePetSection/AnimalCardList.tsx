import React from 'react';
import { grid } from '_panda/patterns';

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

const container = grid({
  gap: '20px',
  justifyContent: 'center',
  gridTemplateColumns: 'repeat(4, 1fr)',
  width: '1120px',
  height: '1024px',
});
