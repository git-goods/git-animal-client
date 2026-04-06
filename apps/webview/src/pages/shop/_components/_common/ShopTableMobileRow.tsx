/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from 'react';
import type { Product } from '@gitanimals/api';
import { snakeToTitleCase } from '@gitanimals/util-common';
import { cn } from '@gitanimals/ui-tailwind/utils';

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

const skeletonStyle =
  'animate-skeleton bg-[length:200%_100%] bg-[linear-gradient(90deg,theme(colors.gray.800)_25%,theme(colors.gray.600)_50%,theme(colors.gray.200)_75%,theme(colors.gray.800)_100%)]';

export function ShopTableRowViewSkeleton() {
  return <div className={cn(rowStyle, skeletonStyle)} />;
}

export const rowStyle =
  'grid h-20 w-full grid-cols-[1fr_2.5fr_1fr_1fr_4.2fr_1.5fr] items-center gap-4 rounded-xl bg-white/10 px-8 text-glyph-20 font-normal text-white-100 ' +
  '[&_button]:w-full [&_button]:px-1.5 [&_button]:text-black ' +
  '[&_*]:overflow-hidden [&_*]:text-ellipsis';

export function ShopTableMobileRow({ personaType, personaLevel, price, rightElement }: Props) {
  const tier = useGetPersonaTier(personaType);

  return (
    <div className={contentStyle}>
      <div>
        <img src={getPersonaImage(personaType)} width={60} height={67} alt="animal1" />
      </div>
      <div className="min-w-0 flex-1">
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

const personaTypeStyle = 'text-glyph-15 font-normal text-white';

const personaContentStyle = 'flex items-center gap-2 text-glyph-14 font-normal text-white/50';

const contentStyle =
  'flex items-center gap-1 rounded-md bg-white/10 py-1 pl-2 pr-4 text-glyph-14 font-normal text-white/50';
