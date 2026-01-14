/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from 'react';
import type { Product } from '@gitanimals/api';
import { cn } from '@gitanimals/ui-tailwind/utils';
import { snakeToTitleCase } from '@gitanimals/util-common';

import { useGetPersonaTier } from '@/hooks/persona/useGetPersonaDropRate';
import { ANIMAL_TIER_TEXT_MAP } from '@/utils/animals';
import { getPersonaImage } from '@/utils/image';
import { addNumberComma } from '@/utils/number';

interface Props {
  rightElement: ReactNode;
  personaType: Product['persona']['personaType'];
  personaLevel?: Product['persona']['personaLevel'];
  price?: Product['price'];
}

export function ShopTableDesktopRow({ rightElement, ...item }: Props) {
  const tier = useGetPersonaTier(item.personaType);

  return (
    <div className={rowStyle}>
      <div>
        <img src={getPersonaImage(item.personaType)} width={60} height={67} alt="animal1" />
      </div>
      <span>{snakeToTitleCase(item.personaType)}</span>
      <span>{ANIMAL_TIER_TEXT_MAP[tier]}</span>
      <span>{item.personaLevel}</span>
      <span>{item.price && addNumberComma(item.price)}</span>
      <div>{rightElement}</div>
    </div>
  );
}

export function ShopTableRowViewSkeleton() {
  return <div className={cn(rowStyle, skeletonStyle)} />;
}

const skeletonStyle = cn(
  'bg-gradient-to-r from-gray-800 via-gray-600 via-gray-200 to-gray-800',
  'bg-[length:200%_100%]',
  'animate-skeleton-loading'
);

export const rowStyle = cn(
  'w-full h-20 bg-white/10 rounded-xl',
  'grid grid-cols-[1fr_2.5fr_1fr_1fr_4.2fr_1.5fr]',
  'items-center px-8 gap-4',
  'font-product text-glyph-20 text-white',
  '[&_button]:text-black [&_button]:w-full [&_button]:px-1.5',
  '[&_*]:overflow-hidden [&_*]:text-ellipsis'
);

export function ShopTableMobileRow({ personaType, personaLevel, price, rightElement }: Props) {
  const tier = useGetPersonaTier(personaType);

  return (
    <div className={cn(
      'flex gap-1 items-center',
      'text-white/50 font-product text-glyph-14',
      'bg-white/10 rounded-md',
      'py-1 pl-2 pr-4'
    )}>
      <div>
        <img src={getPersonaImage(personaType)} width={60} height={67} alt="animal1" />
      </div>
      <div className="flex-1">
        <span className="font-product text-glyph-15 text-white">{snakeToTitleCase(personaType)}</span>
        <div className="flex gap-2 items-center text-white/50 font-product text-glyph-14">
          <span>{ANIMAL_TIER_TEXT_MAP[tier]}</span>
          {personaLevel && (
            <>
              <span>/</span>
              <span>Lv.{personaLevel}</span>
            </>
          )}
          {price && (
            <>
              <span>/</span>
              <span>{addNumberComma(price)}P</span>
            </>
          )}
        </div>
      </div>
      <div>{rightElement}</div>
    </div>
  );
}
