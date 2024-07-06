import React from 'react';
import Image from 'next/image';

import { getPersonaImage } from '@/utils/image';

import { ANIMAL_CARD_IMAGE_BASE_URL, AnimalTier } from './AnimalCard.constant';
import { ANIMAL_TIER_INFO } from './AnimalCard.constant';
import { bgImage, container, infoWrapper, ratingText, thumbnailImage, typeText } from './AnimalCard.style';

interface AnimalCardProps {
  type: string;
  dropRate: string;
}

function AnimalCard(props: AnimalCardProps) {
  const tier = getAnimalTierInfo(Number(props.dropRate.replace('%', '')));

  return (
    <div className={container}>
      <picture className={bgImage}>
        <Image src={`${ANIMAL_CARD_IMAGE_BASE_URL}/card-bg-${tier}.png`} alt={tier} width={265} height={328} />
      </picture>
      <picture className={thumbnailImage}>
        <Image src={`${ANIMAL_CARD_IMAGE_BASE_URL}/card-thumbnail-${tier}.png`} alt={tier} width={233} height={233} />
      </picture>
      <picture className={thumbnailImage}>
        <Image src={getPersonaImage(props.type)} alt={props.type} width={233} height={233} />
      </picture>
      <div className={infoWrapper}>
        <p className={typeText}>{getAnimalTypeLabel(props.type)}</p>
        <p className={ratingText}>{props.dropRate}</p>
      </div>
    </div>
  );
}

export default AnimalCard;

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

const getAnimalTypeLabel = (type: string) => {
  const words = type.split('_');
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};
