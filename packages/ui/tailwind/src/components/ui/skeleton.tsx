import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const skeletonVariants = cva(['overflow-hidden', 'bg-[length:200%_100%]', 'animate-skeleton'].join(' '), {
  variants: {
    color: {
      white: ['bg-white/5', 'bg-gradient-to-r from-white/5 via-white/15 via-50% to-white/5 to-75%'].join(' '),
      black: 'bg-black/5 bg-gradient-to-r from-black/5 via-black/10 via-50% to-black/5 to-75%',
    },
  },
  defaultVariants: {
    color: 'white',
  },
});

export interface SkeletonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({ className, color, ...props }, ref) => {
  return <div ref={ref} className={cn(skeletonVariants({ color }), className)} {...props} />;
});
Skeleton.displayName = 'Skeleton';

export { Skeleton, skeletonVariants };
