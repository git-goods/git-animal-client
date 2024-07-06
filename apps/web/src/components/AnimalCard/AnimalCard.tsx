import React from 'react';
import { css } from '_panda/css';

import { AnimalTier } from './AnimalCard.constant';
import { ANIMAL_TIER_INFO } from './AnimalCard.constant';

interface AnimalCardProps {
  type: string;
  dropRate: string;
}

function AnimalCard(props: AnimalCardProps) {
  const tier = getAnimalTierInfo(Number(props.dropRate.replace('%', '')));

  return <div className={container}>AnimalCard</div>;
}

export default AnimalCard;

const container = css({
  background: 'white',
});

const getAnimalTierInfo = (dropRateNumber: number): AnimalTier => {
  if (dropRateNumber <= ANIMAL_TIER_INFO.EX.max) {
    return AnimalTier.EX;
  }
  if (dropRateNumber <= ANIMAL_TIER_INFO.S_PLUS.max) {
    return AnimalTier.S_PLUS;
  }
  if (dropRateNumber <= ANIMAL_TIER_INFO.A_PLUS.max) {
    return AnimalTier.A_PLUS;
  }
  return AnimalTier.B_MINUS;
};
