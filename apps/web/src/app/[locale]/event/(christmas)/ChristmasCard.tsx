'use client';

import Image from 'next/image';
import { NoRatingCard } from '@gitanimals/ui-tailwind';

import { getPersonaImage } from '@/utils/image';

interface ChristmasCardProps {
  type: string;
}

export function ChristmasCard({ type }: ChristmasCardProps) {
  return (
    <div className="[&_.animal-card-type]:text-black [&_.animal-card-rating]:text-black">
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
