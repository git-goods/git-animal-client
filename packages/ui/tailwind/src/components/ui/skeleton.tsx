'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils/cn';

/**
 * PandaCSS `@gitanimals/ui-panda` 의 Skeleton(`cva.tsx`)과 1:1.
 *
 * gradient 는 gray 토큰 4-stop(gray.800/600/200/800 = #D8D9DD/#9295A1/#2F3238) 그대로.
 * dev 변환본은 이를 white opacity gradient + ease-in-out 으로 바꿔놔서 폐기했다.
 * (animation easing 도 panda 기준 linear 로 토큰 교정 — keyframes.ts)
 */
const skeletonVariants = cva(
  'animate-skeleton overflow-hidden bg-[length:200%_100%] bg-[linear-gradient(90deg,#D8D9DD_25%,#9295A1_50%,#2F3238_75%,#D8D9DD_100%)]',
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
