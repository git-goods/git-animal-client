'use client';

import { memo } from 'react';
import Image from 'next/image';
import { css } from '_panda/css';

export const Background = memo(function Background({ widthBottom }: { widthBottom?: boolean }) {
  const imageSrc = widthBottom ? '/quiz/quiz-bg.webp' : '/quiz/quiz-bg-raw.webp';
  return (
    <div className={backgroundStyle}>
      <Image className={imageStyle} src={imageSrc} alt="background" layout="fill" />
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
