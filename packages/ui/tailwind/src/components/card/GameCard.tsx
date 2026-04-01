'use client';

import { useRef, useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { ANIMAL_CARD_IMAGE_BASE_URL, CARD_INFO, type CardTierType } from './constants';

interface GameCardProps extends VariantProps<typeof cardVariants> {
  tier: CardTierType;
  title: string;
  percentage: string;
  imageUrl: string;
}

const cardVariants = cva(
  'relative inline-block w-full aspect-[220/272]',
  {
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
  }
);

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
    <div className={cardVariants({ size })}>
      <div ref={svgRef}>
        <img
          src={ANIMAL_CARD_IMAGE_BASE_URL + bg}
          alt={'A_PLUS'}
          width={220}
          height={272}
          draggable={false}
          className="w-full h-full"
        />
      </div>

      <div className={cn(
        'absolute inset-0 flex items-center justify-center',
        'top-0 left-0 right-0 w-full aspect-square'
      )}>
        <div className="relative w-[90%] aspect-square">
          <img src={ANIMAL_CARD_IMAGE_BASE_URL + thumbnail} alt={title} className="object-contain" />
        </div>
        <div className={cn(
          'w-[90%] aspect-square absolute top-1/2 left-1/2',
          '-translate-x-1/2 -translate-y-1/2',
          'flex items-center justify-center',
          '[&>img]:w-full [&>img]:h-full [&>img]:object-contain'
        )}>
          <img src={imageUrl} alt={title} className="object-contain" />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 p-4 font-bold text-black flex justify-between"
        style={{ fontSize: `${fontSize.title}px`, padding: positions }}
      >
        <div className="font-bold text-black flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-left">
          {title}
        </div>
        <div className="font-bold text-black text-right">
          {percentage}
        </div>
      </div>
    </div>
  );
}
