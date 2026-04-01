'use client';

import { memo } from 'react';
import Image from 'next/image';

export const Background = memo(function Background({ widthBottom }: { widthBottom?: boolean }) {
  const imageSrc = widthBottom ? '/assets/game/quiz/quiz-bg.webp' : '/assets/game/quiz/quiz-bg-raw.webp';
  return (
    <div className="absolute w-full h-full overflow-hidden -z-[1]">
      <Image className="w-full h-full object-cover object-center" src={imageSrc} alt="background" layout="fill" draggable={false} />
    </div>
  );
});
