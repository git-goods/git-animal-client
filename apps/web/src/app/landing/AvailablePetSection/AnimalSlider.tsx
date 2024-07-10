import { css, cx } from '_panda/css';

import { AnimalCard } from '@/components/AnimalCard';

import * as styles from './AnimalSlider.style';
import AnimalSliderContainer from './AnimalSliderContainer';
import AnimalSliderContainer2 from './AnimalSliderContainer2';

// TODO: api 연동 후 데이터 받아오기
const ANIMAL_LIST = [
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0.7%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0.02%',
  },
  {
    type: 'LITTLE_CHICK',
    dropRate: '0.01%',
  },
  {
    type: 'GOBLIN_BAG',
    dropRate: '0.13%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '10%',
  },
  {
    type: 'GOOSE',
    dropRate: '10%',
  },
  {
    type: 'FISH_MAN',
    dropRate: '10%',
  },
  {
    type: 'GOBLIN',
    dropRate: '10%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0.7%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0.02%',
  },
  {
    type: 'LITTLE_CHICK',
    dropRate: '0.01%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0.7%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0.02%',
  },
  {
    type: 'LITTLE_CHICK',
    dropRate: '0.01%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0.7%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0.02%',
  },
  {
    type: 'LITTLE_CHICK',
    dropRate: '0.01%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0.7%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0.02%',
  },
  {
    type: 'LITTLE_CHICK',
    dropRate: '0.01%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0.7%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '0.02%',
  },
  {
    type: 'LITTLE_CHICK',
    dropRate: '0.01%',
  },
  {
    type: 'LITTLE_CHICK_SUNGLASSES',
    dropRate: '10%',
  },
  {
    type: 'LITTLE_CHICK',
    dropRate: '10%',
  },
];

interface Animal {
  type: string;
  dropRate: string;
}

function AnimalSlider() {
  const animalList: Animal[][] = ANIMAL_LIST.reduce<Animal[][]>((acc, _, idx) => {
    if (idx % 12 === 0) {
      acc.push(ANIMAL_LIST.slice(idx, idx + 12));
    }
    return acc;
  }, []);

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
      <div
        className={cx(
          styles.showMobile,
          css({
            '& .animal-card-container': {
              zIndex: 0,
              transform: 'scale(0.8) translateX(0px)',
              transition: 'transform 0.5s',
            },
            '& .prev .animal-card-container': {
              transform: 'scale(0.8) translateX(20vw)',
            },
            '& .next .animal-card-container': {
              transform: 'scale(0.8) translateX(-20vw)',
            },

            '& .current .animal-card-container': {
              zIndex: 2,
              transform: 'scale(1) translateX(0px)',
            },
          }),
        )}
      >
        <AnimalSliderContainer2>
          {ANIMAL_LIST.map((animalList: Animal, idx) => {
            return (
              // <div key={idx} className="card-wrapper">
              <div key={idx} className={styles.cardContainerMobile}>
                <AnimalCard type={animalList.type} dropRate={animalList.dropRate} />
              </div>
              // </div>
            );
          })}
        </AnimalSliderContainer2>
      </div>
    </div>
  );
}

export default AnimalSlider;
