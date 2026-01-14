'use client';

import Image from 'next/image';

import { getPersonaImage } from '@/utils/image';

interface HalloweenCardProps {
  type: string;
}

export function HalloweenCard({ type }: HalloweenCardProps) {
  const personaImage = getPersonaImage(type);
  const displayType = type
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="[&_.animal-card-type]:text-white [&_.animal-card-rating]:text-white">
      <div className="animal-card-container relative w-[265px] h-[328px]">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <img src="/event/halloween/card-bg-halloween.webp" alt="EX" width={265} height={328} draggable={false} />
        </div>
        <div className="absolute top-4 left-4 right-4 z-[1]">
          <img src="/animal-card/card-thumbnail-A_PLUS.webp" alt="EX" width={233} height={233} draggable={false} />
        </div>
        <div className="absolute top-4 left-4 right-4 z-[1]">
          <img src={personaImage} alt={type} width={233} height={233} draggable={false} />
        </div>
        <div className="animal-card-info absolute bottom-5 left-5 right-5 flex justify-between gap-2">
          <p className="animal-card-type font-product text-glyph-24 font-bold whitespace-nowrap text-ellipsis overflow-hidden leading-10">
            {displayType}
          </p>
          <p className="animal-card-rating font-product text-glyph-22 leading-10">
            <Image src="/event/halloween/halloween-icon.webp" width={32} height={39} alt="halloween" />
          </p>
        </div>
      </div>
    </div>
  );
}
