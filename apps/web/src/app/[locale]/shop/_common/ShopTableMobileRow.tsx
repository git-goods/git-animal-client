/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from 'react';
import type { Product } from '@gitanimals/api';
import { cn } from '@gitanimals/ui-tailwind';
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

const skeletonStyle =
  'animate-skeleton bg-[length:200%_100%] bg-[linear-gradient(90deg,#D8D9DD_25%,#9295A1_50%,#2F3238_75%,#D8D9DD_100%)]';

export const rowStyle =
  'w-full h-[80px] bg-white-10 rounded-[12px] grid grid-cols-[1fr_2.5fr_1fr_1fr_4.2fr_1.5fr] items-center px-[32px] gap-[16px] glyph20-regular text-white-100 [&_button]:text-black [&_button]:w-full [&_button]:px-[6px] [&_*]:overflow-hidden [&_*]:text-ellipsis';

export function ShopTableMobileRow({ personaType, personaLevel, price, rightElement }: Props) {
  const tier = useGetPersonaTier(personaType);

  return (
    <div className={contentStyle}>
      <div>
        <img src={getPersonaImage(personaType)} width={60} height={67} alt="animal1" />
      </div>
      <div className="flex-1">
        <span className={personaTypeStyle}>{snakeToTitleCase(personaType)}</span>
        <div className={personaContentStyle}>
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

const personaTypeStyle = 'glyph15-regular text-white';

const personaContentStyle = 'flex gap-[8px] items-center text-white-50 glyph14-regular';

const contentStyle = 'flex gap-[4px] items-center text-white-50 glyph14-regular bg-white-10 rounded-[6px] p-[4px_16px_4px_8px]';
