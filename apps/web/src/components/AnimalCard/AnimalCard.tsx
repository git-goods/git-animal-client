import React from 'react';
import Image from 'next/image';
import { cx } from '_panda/css';

import { getAnimalTierInfo } from '@/utils/animals';
import { getPersonaImage } from '@/utils/image';

import { ANIMAL_CARD_IMAGE_BASE_URL } from './AnimalCard.constant';
import * as styles from './AnimalCard.style';

interface AnimalCardProps {
  type: string;
  dropRate: string;
}

function AnimalCard(props: AnimalCardProps) {
  const tier = getAnimalTierInfo(Number(props.dropRate.replace('%', '')));

  return (
    <div className={cx('animal-card-container', styles.container)}>
      <div className={styles.bgImage}>
        <Image src={`${ANIMAL_CARD_IMAGE_BASE_URL}/card-bg-${tier}.webp`} alt={tier} width={265} height={328} />
      </div>
      <div className={styles.thumbnailImage}>
        <Image src={`${ANIMAL_CARD_IMAGE_BASE_URL}/card-thumbnail-${tier}.webp`} alt={tier} width={233} height={233} />
      </div>
      <picture className={styles.thumbnailImage}>
        <Image src={getPersonaImage(props.type)} alt={props.type} width={233} height={233} />
      </picture>
      <div className={cx('animal-card-info', styles.infoWrapper)}>
        <p className={cx('animal-card-type', styles.typeText)}>{getAnimalTypeLabel(props.type)}</p>
        <p className={cx('animal-card-rating', styles.ratingText)}>{props.dropRate}</p>
      </div>
    </div>
  );
}

export default AnimalCard;

const getAnimalTypeLabel = (type: string) => {
  const words = type.split('_');
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};
