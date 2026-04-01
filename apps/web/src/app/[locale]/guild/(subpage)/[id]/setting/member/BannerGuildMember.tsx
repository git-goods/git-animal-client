/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from 'react';
import { cn } from '@gitanimals/ui-tailwind/utils';

export function BannerGuildMember({
  image,
  name,
  count,
  bottomElement,
}: {
  image: string;
  name: string;
  count: string;
  bottomElement: ReactNode;
}) {
  return (
    <div className={bannerStyle}>
      <div>
        <img src={image} alt={name} width={80} height={80} />
        <p className={nameStyle}>{name}</p>
        <p className={countStyle}>{count}</p>
      </div>
      <div className="flex gap-2">{bottomElement}</div>
    </div>
  );
}

const bannerStyle = cn(
  'inline-flex p-[8px_16px_16px_16px] flex-col items-center',
  'bg-white/10 rounded-lg text-center gap-3'
);

const nameStyle = cn(
  'font-product text-glyph-16 text-white'
);

const countStyle = cn(
  'font-product text-glyph-14 text-white/50'
);
