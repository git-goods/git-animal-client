'use client';

import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const bannerVariants = cva(
  'flex flex-col items-center justify-center rounded-xl transition-all duration-300 relative border-2 border-transparent overflow-hidden',
  {
    variants: {
      status: {
        selected: 'border-white/50 bg-white/25',
        gradient: 'bg-gradient-to-br from-[rgba(255,253,201,0.4)] via-[rgba(150,230,216,0.4)] to-[rgba(125,171,241,0.4)]',
        default: 'bg-white/10',
      },
      size: {
        small: 'w-[80px] h-[80px] max-mobile:w-[52px] max-mobile:h-[52px] max-mobile:rounded-[5px] [&_img]:w-full [&_img]:h-full [&_img]:object-contain',
        medium: 'w-[120px] h-[149px] p-3 px-5',
        full: 'w-full h-full [&_img]:w-full [&_img]:h-full [&_img]:object-contain',
      },
    },
    defaultVariants: {
      status: 'default',
      size: 'medium',
    },
  }
);

interface LevelBannerProps extends VariantProps<typeof bannerVariants> {
  image: string | ReactNode;
  level: number;
  className?: string;
}

export function LevelBanner({ image, level, className, status, size }: LevelBannerProps) {
  return (
    <div className={cn(bannerVariants({ status, size }), className)}>
      {typeof image === 'string' ? (
        <img src={image} width={160} height={160} alt="" draggable={false} />
      ) : (
        image
      )}
      <p className="rounded-xl bg-black/25 px-2 text-white/75 font-product text-[10px] leading-5 absolute bottom-[3px] right-[3px]">
        Lv.{level}
      </p>
    </div>
  );
}

