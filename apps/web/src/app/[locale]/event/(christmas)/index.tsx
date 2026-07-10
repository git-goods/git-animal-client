import Image from 'next/image';

import { BackgroundSection } from '../(common)/BackgroundSection';

import { ChristmasCardList } from './CardList';
import { ChristmasDraw } from './Draw';
import { Snowflake } from './Snowflake';

const bgTypes = ['GRASS_CHRISTMAS_TREE_FIELD', 'SNOW_GRASS_FIELD', 'SNOW_HOUSE_FIELD'];
export function ChristmasContent() {
  return (
    <>
      <div className="relative w-full min-h-[calc(100vh_-_60px)] overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <Snowflake
            key={i}
            delay={i * 0.3}
            left={`${Math.random() * 100}%`}
            size={10 + Math.random() * 15}
            duration={8 + Math.random() * 3}
          />
        ))}

        <Image
          src="/event/christmas/christmas-bg.webp"
          alt="christmas bg"
          layout="fill"
          objectFit="cover"
          className="pointer-events-none"
        />

        <div className="flex relative w-full h-full pt-[211px] z-floating flex-col pb-[280px] mobile:pt-[110px] mobile:pb-[200px]">
          <Image
            src="/event/christmas/christmas-logo.svg"
            alt="gitanimals christmas event"
            width={1357}
            height={199}
            objectFit="contain"
            className="object-contain mx-auto max-w-[80vw] h-auto mobile:max-w-[90vw]"
            draggable={false}
          />
          <p className="text-white-90 glyph32-bold font-normal text-center whitespace-pre-line mt-[60px] mb-[100px] mobile:glyph16-regular mobile:text-[16px] mobile:mt-[20px] mobile:mb-[40px]">
            Christmas has come to Gitanimals
            <br />
            Draw Christmas pet for free!
          </p>
          <ChristmasCardList />
          <ChristmasDraw />
        </div>
      </div>
      <BackgroundSection possibleBgTypes={bgTypes} />
    </>
  );
}
