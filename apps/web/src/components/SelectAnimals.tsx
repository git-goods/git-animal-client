import Image from 'next/image';
import { css } from '_panda/css';

import { NEW_USER_BONUS_PET_LIST } from '@/constants/pet';

const ANIMAL_LIST = NEW_USER_BONUS_PET_LIST.map((key) => ({
  key,
  image: `/animals/${key}.png`,
}));

interface Props {
  selected?: string;
  setSelected: (key: string) => void;

  size?: number;
}

function SelectAnimals({ selected, setSelected, size = 196 }: Props) {
  return (
    <ul className={animalListStyle}>
      {ANIMAL_LIST.map((animal) => (
        <button key={animal.key} onClick={() => setSelected(animal.key)}>
          {selected === animal.key && (
            <Image className={selectedImageStyle} src="/animals/animal-selected.svg" alt="animal" fill />
          )}
          <Image src={animal.image} alt="animal" width={size} height={size} />
        </button>
      ))}
    </ul>
  );
}

export default SelectAnimals;

const animalListStyle = css({
  display: 'flex',
  maxWidth: '100%',
  width: '1000px',
  overflowX: 'auto',
  '&::-webkit-scrollbar': {
    width: '2px',
    height: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#2b2b2b8b',
    borderRadius: '10px',
    backgroundClip: 'padding-box',
    border: '2px solid transparent',
  },
  '& button': {
    position: 'relative',
    zIndex: 1,
  },
});

const selectedImageStyle = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
});
