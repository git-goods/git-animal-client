'use client';

import Image from 'next/image';
import { NoRatingCard } from '@gitanimals/ui-tailwind';

import { getPersonaImage } from '@/utils/image';

interface HalloweenCardProps {
  type: string;
}

export function HalloweenCard({ type }: HalloweenCardProps) {
  return (
    <div className="[&_.animal-card-type]:text-white [&_.animal-card-rating]:text-white">
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
