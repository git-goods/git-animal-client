'use client';

import { memo } from 'react';

export const Background = memo(function Background({ widthBottom }: { widthBottom?: boolean }) {
  const imageSrc = widthBottom ? '/assets/game/quiz/quiz-bg.webp' : '/assets/game/quiz/quiz-bg-raw.webp';
  return (
    <div className="absolute z-[-1] h-full w-full overflow-hidden">
      <img className="h-full w-full object-cover object-center" src={imageSrc} alt="background" draggable={false} />
    </div>
  );
});
