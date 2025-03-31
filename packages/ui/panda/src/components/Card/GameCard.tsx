'use client';

import { css, cva } from '_panda/css';
import { useRef, useState, useEffect } from 'react';
import { ANIMAL_CARD_IMAGE_BASE_URL, CARD_INFO, CardTierType } from './constants';

interface GameCardProps {
  tier: CardTierType;
  title: string;
  percentage: string;
  imageUrl: string;
  size?: 'small' | 'medium' | 'large' | 'responsive';
}

export function GameCard({ title, percentage, tier, imageUrl, size = 'medium' }: GameCardProps) {
  const svgRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState({
    title: 16,
    percentage: 16,
    rating: 16,
  });
  const [positions, setPositions] = useState('1rem');

  useEffect(() => {
    if (!svgRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;

      setFontSize({
        title: width * 0.08,
        percentage: width * 0.08,
        rating: width * 0.1,
      });

      const paddingX = Math.max(12, width * 0.075);
      const paddingY = Math.max(14.4, width * 0.09);

      setPositions(`${paddingY}px ${paddingX}px`);
    });

    resizeObserver.observe(svgRef.current);
    return () => resizeObserver.disconnect();
  }, [size]);

  const { bg, thumbnail } = CARD_INFO[tier];

  return (
    <div className={cardCva({ size })}>
      <div ref={svgRef}>
        <img
          src={ANIMAL_CARD_IMAGE_BASE_URL + bg}
          alt={'A_PLUS'}
          width={220}
          height={272}
          draggable={false}
          className={bgImageStyle}
        />
      </div>

      <div className={imageContainerStyle}>
        <div className={imageWrapperStyle}>
          <img src={ANIMAL_CARD_IMAGE_BASE_URL + thumbnail} alt={title} style={{ objectFit: 'contain' }} />
        </div>
        <div className={imageStyle}>
          <img src={imageUrl} alt={title} style={{ objectFit: 'contain' }} />
        </div>
      </div>

      <div className={textWrapperStyle} style={{ fontSize: `${fontSize.title}px`, padding: positions }}>
        <div className={titleStyle}>{title}</div>

        <div className={percentageStyle}>{percentage}</div>
      </div>
    </div>
  );
}

const bgImageStyle = css({
  width: '100%',
  height: '100%',
});

const imageContainerStyle = css({
  position: 'absolute',
  inset: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: '0',
  left: '0',
  right: '0',
  width: '100%',
  aspectRatio: '1/1',
});

const imageWrapperStyle = css({
  position: 'relative',
  width: '90%',
  aspectRatio: '1/1',
});

const imageStyle = css({
  width: '90%',
  aspectRatio: '1/1',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& > img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
});

const textWrapperStyle = css({
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
  padding: '1rem',
  fontWeight: 'bold',
  color: '#000000',
  display: 'flex',
  justifyContent: 'space-between',
});

const titleStyle = css({
  fontWeight: 'bold',
  color: '#000000',
  flex: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'left',
});

const percentageStyle = css({
  fontWeight: 'bold',
  color: '#000000',
  textAlign: 'right',
});

const cardCva = cva({
  base: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    maxWidth: '300px',
    aspectRatio: '220/272',
  },
  variants: {
    size: {
      small: {
        maxWidth: '150px',
      },
      medium: {
        maxWidth: '200px',
      },
      large: {
        maxWidth: '300px',
      },
      responsive: {
        maxWidth: '100%',
      },
    },
  },
});
