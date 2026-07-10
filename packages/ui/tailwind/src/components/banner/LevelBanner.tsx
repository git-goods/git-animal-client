import type { ReactNode } from 'react';

import { cn } from '../../utils/cn';
import { bannerVariants, type BannerStyleProps } from './cva';

type Props = BannerStyleProps & {
  image: string | ReactNode;
  level: number;
  className?: string;
};

export function LevelBanner({ image, level, className, ...styleProps }: Props) {
  return (
    <div className={cn(bannerVariants(styleProps), className)}>
      {typeof image === 'string' ? <img src={image} width={160} height={160} alt={image} draggable={false} /> : image}
      <p className="glyph12-regular absolute bottom-[3px] right-[3px] rounded-[12px] bg-black-25 px-[8px] text-[10px] leading-[20px] text-white-75">
        Lv.{level}
      </p>
    </div>
  );
}
