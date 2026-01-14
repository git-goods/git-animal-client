'use client';

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
    },
    defaultVariants: {
      status: 'default',
    },
  }
);

interface BannerPetSelectMediumProps extends VariantProps<typeof bannerVariants> {
  name: string;
  count: string | number;
  image: string;
}

export function BannerPetSelectMedium({ name, count, image, status = 'default' }: BannerPetSelectMediumProps) {
  return (
    <div className={cn(bannerVariants({ status }), 'w-[120px] h-[149px] p-3 px-5')}>
      <img src={image} alt={name} width={80} height={80} draggable={false} />
      <p className="font-product text-glyph-16 text-white">{name}</p>
      <p className="font-product text-glyph-14 text-white/50">{count}</p>
    </div>
  );
}

