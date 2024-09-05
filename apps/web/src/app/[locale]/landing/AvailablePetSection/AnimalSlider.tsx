'use client';

import { AnimalCard } from '@/components/AnimalCard';
import { useGetAllPersona } from '@/hooks/query/render/useGetAllPersona';

import * as styles from './AnimalSlider.style';
import AnimalSliderContainer from './AnimalSliderContainer';
import AnimalSliderContainerMobile from './AnimalSliderContainerMobile';

interface Animal {
  type: string;
  dropRate: string;
}

function shuffle(array: Animal[]): Animal[] {
  return array.sort(() => Math.random() - 0.5);
}

function AnimalSlider() {
  const { data } = useGetAllPersona();

  const ANIMAL_LIST = shuffle(data.personas);

  const animalList: Animal[][] = data.personas.reduce<Animal[][]>((acc, _, idx) => {
    if (idx % 12 === 0) {
      acc.push(ANIMAL_LIST.slice(idx, idx + 12));
    }
    return acc;
  }, []);

  // TODO: 화면 크기가 바뀌면 (breakpoint에 도달하면 slider 다시 렌더링)
  return (
    <div className={styles.container}>
      <div className={styles.showDesktop}>
        <AnimalSliderContainer>
          {animalList.map((animalList: Animal[], idx) => {
            return (
              <div key={idx}>
                <div className={styles.cardContainer}>
                  {animalList.map((animal: Animal, index: number) => (
                    <AnimalCard key={index} type={animal.type} dropRate={animal.dropRate} />
                  ))}
                </div>
              </div>
            );
          })}
        </AnimalSliderContainer>
      </div>
      <div className={styles.showMobile}>
        <AnimalSliderContainerMobile>
          {data.personas.map((animalList: Animal, idx) => {
            return (
              <div key={idx} className={styles.cardContainerMobile}>
                <AnimalCard type={animalList.type} dropRate={animalList.dropRate} />
              </div>
            );
          })}
        </AnimalSliderContainerMobile>
      </div>
    </div>
  );
}

export default AnimalSlider;
