'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils/cn';

/**
 * PandaCSS `@gitanimals/ui-panda` 의 Skeleton(`cva.tsx`)과 1:1.
 *
 * panda 원본의 gradient sweep(#1f2937↔#e5e7eb)은 다크 UI 에서 너무 요란해서 폐기.
 * 색 범위를 없애고 단색(white-10) 위에 은은한 opacity blink(animate-pulse, 1→0.7)만
 * 주는 방식으로 재설계(사용자 요청) — sweep 없이 최소한의 로딩 신호.
 */
const skeletonVariants = cva(
  'animate-pulse overflow-hidden',
  {
    variants: {
      color: {
        white: 'bg-white-10',
        black: 'bg-black-10',
      },
    },
    defaultVariants: {
      color: 'white',
    },
  },
);

export interface SkeletonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({ className, color, ...props }, ref) => (
  <div ref={ref} className={cn(skeletonVariants({ color }), className)} {...props} />
));
Skeleton.displayName = 'Skeleton';

export { Skeleton, skeletonVariants };
