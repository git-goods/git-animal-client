'use client';

import Image from 'next/image';
import { css } from '_panda/css';
import { NoRatingCard } from '@gitanimals/ui-panda';

import { getPersonaImage } from '@/utils/image';

interface HalloweenCardProps {
  type: string;
}

export function HalloweenCard({ type }: HalloweenCardProps) {
  return (
    <div className={containerStyle}>
      <NoRatingCard
        tier="EX"
        type={type}
        personaImage={getPersonaImage(type)}
        bgUrl="/event/halloween/card-bg-halloween.webp"
        thumbnailUrl="/animal-card/card-thumbnail-A_PLUS.webp"
        rightTextEl={<Image src="/event/halloween/halloween-icon.webp" width={32} height={39} alt="halloween" />}
      />
    </div>
  );
}

const containerStyle = css({
  '& .animal-card-type': {
    color: '#fff',
  },
  '& .animal-card-rating': {
    color: '#fff',
  },
});
