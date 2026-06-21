import React from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { cn } from '@gitanimals/ui-tailwind';

import { MediaQuery } from '@/components/MediaQuery';

import { HalloweenCardList } from './CardList';
import { KingGhost } from './KingGhost';

export async function HalloweenContent() {
  const t = await getTranslations('Event.Halloween');
  return (
    <div className="relative w-full min-h-[calc(100vh_-_60px)] font-product">
      <Image
        src="/event/halloween/halloween-bg.webp"
        alt="halloween bg"
        layout="fill"
        objectFit="cover"
        className="pointer-events-none"
      />
      <Image
        src="/event/halloween/halloween-right.webp"
        alt="halloween bg"
        width={544}
        height={1470}
        objectFit="contain"
        className={cn(imageStyle, 'right-0')}
      />
      <Image
        src="/event/halloween/halloween-left.webp"
        alt="halloween bg"
        width={561}
        height={1470}
        objectFit="contain"
        className={cn(imageStyle, 'absolute left-0')}
      />

      <MediaQuery mobile={<KingGhost />} />

      <div className="flex relative w-full h-full pt-[211px] z-floating flex-col mobile:pt-[180px] mobile:pb-[200px]">
        <Image
          src="/event/halloween/halloween-title.svg"
          alt="gitanimals halloween event"
          width={1357}
          height={199}
          objectFit="contain"
          className="object-contain mx-auto max-w-[80vw] h-auto mobile:max-w-[90vw]"
          draggable={false}
        />
        <h2 className="mt-[24px] text-[28px] leading-[1.5] text-center text-[#fff] mb-[40px] whitespace-pre-line font-semibold mobile:text-[24px]">
          {t('description')}
        </h2>

        <HalloweenCardList />
      </div>
    </div>
  );
}

const imageStyle =
  'w-auto h-full absolute object-contain z-base min-h-[calc(100vh_-_60px)] pointer-events-none top-[-60px] mobile:hidden';
