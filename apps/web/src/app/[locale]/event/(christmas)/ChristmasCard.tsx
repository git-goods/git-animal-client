'use client';

import Image from 'next/image';
import { css } from '_panda/css';
import { NoRatingCard } from '@gitanimals/ui-panda';

import { getPersonaImage } from '@/utils/image';

interface ChristmasCardProps {
  type: string;
}

export function ChristmasCard({ type }: ChristmasCardProps) {
  return (
    <div className={containerStyle}>
      <NoRatingCard
        tier="EX"
        type={type}
        personaImage={getPersonaImage(type)}
        bgUrl="/event/christmas/card-bg-christmas.webp"
        thumbnailUrl="/event/christmas/unknown-rate.webp"
        rightTextEl={<Image src="/event/christmas/christmas-icon.webp" width={32} height={39} alt="christmas" />}
      />
    </div>
  );
}

const containerStyle = css({
  '& .animal-card-type': {
    color: '#000',
  },
  '& .animal-card-rating': {
    color: '#000',
  },
});
