import { Loader } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '../../utils/cn';
import { skeletonVariants } from '../ui/skeleton';
import { bannerVariants, type BannerStyleProps } from './cva';

type BannerProps = BannerStyleProps & {
  label?: string;
  image: string | ReactNode;
  loading?: boolean;
  className?: string;
};

export function Banner({ image, label, loading, className, ...styleProps }: BannerProps) {
  return (
    <div className={cn(bannerVariants(styleProps), className)}>
      {typeof image === 'string' ? <img draggable="false" src={image} width={160} height={160} alt={image} /> : image}
      {label && (
        <p className="glyph16-regular max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap text-center text-white">
          {label}
        </p>
      )}
      {loading && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center border-white-50 bg-white-25">
          <Loader width={32} height={32} color="white" />
        </div>
      )}
    </div>
  );
}

export function BannerSkeleton(props: BannerStyleProps) {
  return <div className={cn(bannerVariants(props), skeletonVariants({ color: 'white' }))} />;
}

export function BannerSkeletonList({ length, ...props }: BannerStyleProps & { length: number }) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <BannerSkeleton key={index} {...props} />
      ))}
    </>
  );
}
