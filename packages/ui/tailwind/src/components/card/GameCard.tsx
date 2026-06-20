'use client';

import { useRef, useState, useEffect } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '../../utils/cn';
import { ANIMAL_CARD_IMAGE_BASE_URL, CARD_INFO, type CardTierType } from './constants';

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
          className="h-full w-full"
        />
      </div>

      <div className="absolute inset-0 left-0 right-0 top-0 flex aspect-square w-full items-center justify-center">
        <div className="relative aspect-square w-[90%]">
          <img src={ANIMAL_CARD_IMAGE_BASE_URL + thumbnail} alt={title} style={{ objectFit: 'contain' }} />
        </div>
        <div className="absolute left-1/2 top-1/2 flex aspect-square w-[90%] -translate-x-1/2 -translate-y-1/2 items-center justify-center [&>img]:h-full [&>img]:w-full [&>img]:object-contain">
          <img src={imageUrl} alt={title} style={{ objectFit: 'contain' }} />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 flex justify-between p-[1rem] font-bold text-[#000000]"
        style={{ fontSize: `${fontSize.title}px`, padding: positions }}
      >
        <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left font-bold text-[#000000]">
          {title}
        </div>

        <div className="text-right font-bold text-[#000000]">{percentage}%</div>
      </div>
    </div>
  );
}

const cardCva = cva('relative inline-block aspect-[220/272] w-full max-w-[300px]', {
  variants: {
    size: {
      small: 'max-w-[150px]',
      medium: 'max-w-[200px]',
      large: 'max-w-[300px]',
      responsive: 'max-w-full',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});
