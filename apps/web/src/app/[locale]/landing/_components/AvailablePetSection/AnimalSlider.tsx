'use client';

import type { PersonaInfo } from '@gitanimals/api';

import { AnimalCard } from '@/components/AnimalCard';
import { MediaQuery } from '@/components/MediaQuery';
import { PerspectiveCenterSlider } from '@/components/Slider';
import { useGetAllPersona } from '@/hooks/query/render/useGetAllPersona';

import AnimalSliderContainerMobile from './AnimalSliderContainerMobile';

function shuffle(array: PersonaInfo[]): PersonaInfo[] {
  return array.sort(() => Math.random() - 0.5);
}

const containerStyle =
  'w-[1120px] h-[1024px] [@media(max-width:1200px)]:w-[835px] [@media(max-width:900px)]:w-[530px] [@media(max-width:600px)]:w-[calc(100vw-40px)] [@media(max-width:600px)]:h-[325px] [@media(max-width:600px)]:relative';

const cardContainer =
  'grid justify-center grid-cols-[repeat(4,1fr)] grid-rows-[repeat(3,1fr)] w-[1120px] h-[1024px] gap-[20px] px-px [@media(max-width:1200px)]:grid-cols-[repeat(3,1fr)] [@media(max-width:1200px)]:grid-rows-[repeat(3,1fr)] [@media(max-width:1200px)]:w-[835px] [@media(max-width:1200px)]:mx-auto [@media(max-width:1200px)]:[&>div:nth-child(n+10)]:hidden [@media(max-width:900px)]:grid-cols-[repeat(2,1fr)] [@media(max-width:900px)]:grid-rows-[repeat(3,1fr)] [@media(max-width:900px)]:w-[530px] [@media(max-width:900px)]:[&>div:nth-child(n+7)]:hidden';

const cardContainerMobile =
  'grid w-[265px] h-[325px] px-px [@media(max-width:400px)]:w-[200px] [@media(max-width:400px)]:h-[244px] [@media(max-width:400px)]:[&_.animal-card-info]:bottom-[10px] [@media(max-width:400px)]:[&_.animal-card-type]:glyph18-bold [@media(max-width:400px)]:[&_.animal-card-rating]:glyph16-regular';

function AnimalSlider() {
  const { data } = useGetAllPersona({
    staleTime: 1000 * 60 * 60 * 24,
  });

  const ANIMAL_LIST = shuffle(data.personas);

  const animalList: PersonaInfo[][] = data.personas.reduce<PersonaInfo[][]>((acc, _, idx) => {
    if (idx % 12 === 0) {
      acc.push(ANIMAL_LIST.slice(idx, idx + 12));
    }
    return acc;
  }, []);

  // TODO: 화면 크기가 바뀌면 (breakpoint에 도달하면 slider 다시 렌더링)
  return (
    <div className={containerStyle}>
      <MediaQuery
        desktop={
          <PerspectiveCenterSlider>
            {animalList.map((animalList: PersonaInfo[], idx) => {
              return (
                <div key={idx}>
                  <div className={cardContainer}>
                    {animalList.map((animal: PersonaInfo, index: number) => (
                      <AnimalCard key={index} {...animal} />
                    ))}
                  </div>
                </div>
              );
            })}
          </PerspectiveCenterSlider>
        }
        mobile={
          <AnimalSliderContainerMobile>
            {data.personas.map((animalList: PersonaInfo, idx) => {
              return (
                <div key={idx} className={cardContainerMobile}>
                  <AnimalCard {...animalList} />
                </div>
              );
            })}
          </AnimalSliderContainerMobile>
        }
      />
    </div>
  );
}

export default AnimalSlider;
