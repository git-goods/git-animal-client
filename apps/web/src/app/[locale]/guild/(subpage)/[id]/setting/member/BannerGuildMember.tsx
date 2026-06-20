/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from 'react';

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
    <div className="inline-flex pt-[8px] px-[16px] pb-[16px] flex-col items-center bg-white-10 rounded-[8px] text-center gap-[12px]">
      <div>
        <img src={image} alt={name} width={80} height={80} />
        <p className="glyph16-regular text-white">{name}</p>
        <p className="glyph14-regular text-white-50">{count}</p>
      </div>
      <div className="flex gap-2">{bottomElement}</div>
    </div>
  );
}
