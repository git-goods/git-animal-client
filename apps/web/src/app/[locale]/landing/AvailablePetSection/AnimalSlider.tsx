'use client';

import { cn } from '@gitanimals/ui-tailwind';
import type { PersonaInfo } from '@gitanimals/api';

import { AnimalCard } from '@/components/AnimalCard';
import { MediaQuery } from '@/components/MediaQuery';
import { PerspectiveCenterSlider } from '@/components/Slider';
import { useGetAllPersona } from '@/hooks/query/render/useGetAllPersona';

import * as styles from './AnimalSlider.style';
import AnimalSliderContainerMobile from './AnimalSliderContainerMobile';

function shuffle(array: PersonaInfo[]): PersonaInfo[] {
  return array.sort(() => Math.random() - 0.5);
}

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
    <div className={cn(containerStyle)}>
      <MediaQuery
        desktop={
          <PerspectiveCenterSlider>
            {animalList.map((animalList: PersonaInfo[], idx) => {
              return (
                <div key={idx}>
                  <div className={styles.cardContainer}>
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
                <div key={idx} className={styles.cardContainerMobile}>
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

const containerStyle = cn(
  'w-[1120px] h-[1024px]',
  'max-[1200px]:w-[835px]',
  'max-[900px]:w-[530px]',
  'max-[600px]:w-[calc(100vw-40px)] max-[600px]:h-[325px] max-[600px]:relative'
);
