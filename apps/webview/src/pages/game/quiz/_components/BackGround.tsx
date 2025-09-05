'use client';

import { memo } from 'react';
import { css } from '_panda/css';

export const Background = memo(function Background({ widthBottom }: { widthBottom?: boolean }) {
  const imageSrc = widthBottom ? '/assets/game/quiz/quiz-bg.webp' : '/assets/game/quiz/quiz-bg-raw.webp';
  return (
    <div className={backgroundStyle}>
      <img className={imageStyle} src={imageSrc} alt="background" draggable={false} />
    </div>
  );
});

const backgroundStyle = css({
  position: 'absolute',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: -1,
});

const imageStyle = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
});
