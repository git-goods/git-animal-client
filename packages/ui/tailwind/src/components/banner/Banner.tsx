'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Loader } from 'lucide-react';
import type { ReactNode } from 'react';
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

export type BannerVariantProps = VariantProps<typeof bannerVariants>;

interface BannerProps extends BannerVariantProps {
  image: string | ReactNode;
  label?: string;
  loading?: boolean;
  className?: string;
}

export function Banner({ image, label, loading, className, status, size }: BannerProps) {
  return (
    <div className={cn(bannerVariants({ status, size }), className)}>
      {typeof image === 'string' ? (
        <img draggable={false} src={image} width={160} height={160} alt="" />
      ) : (
        image
      )}
      {label && (
        <p className="font-product text-glyph-16 text-white max-w-[80px] text-center overflow-hidden text-ellipsis whitespace-nowrap">
          {label}
        </p>
      )}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white/25 border-white/50">
          <Loader width={32} height={32} color="white" className="animate-spin" />
        </div>
      )}
    </div>
  );
}

export function BannerSkeleton({ className, status, size }: BannerVariantProps & { className?: string }) {
  return (
    <div
      className={cn(
        bannerVariants({ status, size }),
        'animate-pulse bg-gradient-to-r from-gray-800 via-gray-600 to-gray-200 bg-[length:200%_100%]',
        className
      )}
    />
  );
}

export function BannerSkeletonList({
  length,
  ...props
}: BannerVariantProps & { length: number; className?: string }) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <BannerSkeleton key={index} {...props} />
      ))}
    </>
  );
}

