import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const skeletonVariants = cva(
  [
    'overflow-hidden',
    'bg-[length:200%_100%]',
    'animate-skeleton',
  ].join(' '),
  {
    variants: {
      color: {
        white: [
          'bg-white/10',
          'bg-gradient-to-r from-gray-800 via-gray-600 via-50% to-gray-200 to-75%',
        ].join(' '),
        black: 'bg-black/10',
      },
    },
    defaultVariants: {
      color: 'white',
    },
  }
);

export interface SkeletonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, color, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ color }), className)}
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';

export { Skeleton, skeletonVariants };
