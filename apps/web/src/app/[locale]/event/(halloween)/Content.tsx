import React from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { cn } from '@gitanimals/ui-tailwind/utils';

import { MediaQuery } from '@/components/MediaQuery';

import { HalloweenCardList } from './CardList';
import { KingGhost } from './KingGhost';

export async function HalloweenContent() {
  const t = await getTranslations('Event.Halloween');
  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] font-product">
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
        className={cn(
          'w-auto h-full absolute object-contain z-base min-h-[calc(100vh-60px)] pointer-events-none top-[-60px] max-mobile:hidden',
          'right-0',
        )}
      />
      <Image
        src="/event/halloween/halloween-left.webp"
        alt="halloween bg"
        width={561}
        height={1470}
        objectFit="contain"
        className={cn(
          'w-auto h-full absolute object-contain z-base min-h-[calc(100vh-60px)] pointer-events-none top-[-60px] max-mobile:hidden',
          'absolute left-0',
        )}
      />

      <MediaQuery mobile={<KingGhost />} />

      <div className="relative w-full h-full pt-[211px] z-floating flex flex-col max-mobile:pt-[180px] max-mobile:pb-[200px]">
        <Image
          src="/event/halloween/halloween-title.svg"
          alt="gitanimals halloween event"
          width={1357}
          height={199}
          objectFit="contain"
          className="object-contain mx-auto max-w-[80vw] h-auto max-mobile:max-w-[90vw]"
          draggable={false}
        />
        <h2 className="mt-6 text-[28px] leading-[1.5] text-center text-white mb-10 whitespace-pre-line font-semibold max-mobile:text-2xl">
          {t('description')}
        </h2>

        <HalloweenCardList />
      </div>
    </div>
  );
}
