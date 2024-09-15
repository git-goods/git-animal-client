import React from 'react';
import { Card } from '@gitanimals/ui-panda';

import { getPersonaImage } from '@/utils/image';

import type { AnimalTierType } from './AnimalCard.constant';
import { AnimalTier } from './AnimalCard.constant';
import { ANIMAL_TIER_INFO } from './AnimalCard.constant';

interface AnimalCardProps {
  type: string;
  dropRate: string;
}

function AnimalCard(props: AnimalCardProps) {
  const tier = getAnimalTierInfo(Number(props.dropRate.replace('%', '')));

  return <Card tier={tier} type={props.type} dropRate={props.dropRate} personaImage={getPersonaImage(props.type)} />;
}

export default AnimalCard;

const getAnimalTierInfo = (dropRateNumber: number): AnimalTierType => {
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
