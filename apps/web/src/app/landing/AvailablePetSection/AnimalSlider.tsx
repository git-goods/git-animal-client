import { AnimalCard } from '@/components/AnimalCard';

import * as styles from './AnimalSlider.style';
import AnimalSliderContainer from './AnimalSliderContainer';

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
  );
}

export default AnimalSlider;
