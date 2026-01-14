import Image from 'next/image';

import { BackgroundSection } from '../(common)/BackgroundSection';

import { ChristmasCardList } from './CardList';
import { ChristmasDraw } from './Draw';
import { Snowflake } from './Snowflake';

const bgTypes = ['GRASS_CHRISTMAS_TREE_FIELD', 'SNOW_GRASS_FIELD', 'SNOW_HOUSE_FIELD'];
export function ChristmasContent() {
  return (
    <>
      <div className="relative w-full min-h-[calc(100vh-60px)] overflow-hidden">
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

        <div className="relative w-full h-full pt-[211px] z-[2] flex flex-col pb-[280px] max-mobile:pt-[110px] max-mobile:pb-[200px]">
          <Image
            src="/event/christmas/christmas-logo.svg"
            alt="gitanimals christmas event"
            width={1357}
            height={199}
            objectFit="contain"
            className="object-contain mx-auto max-w-[80vw] h-auto max-mobile:max-w-[90vw]"
            draggable={false}
          />
          <p className="text-white-90 font-product text-glyph-32 font-bold font-normal text-center whitespace-pre-line mt-[60px] mb-[100px] max-mobile:font-product max-mobile:text-glyph-16 max-mobile:text-base max-mobile:mt-5 max-mobile:mb-10">
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
