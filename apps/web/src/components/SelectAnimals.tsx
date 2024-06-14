import Image from 'next/image';
import styled from 'styled-components';

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
    <AnimalList>
      {ANIMAL_LIST.map((animal) => (
        <button key={animal.key} onClick={() => setSelected(animal.key)}>
          {selected === animal.key && <SelectedImage src="/animals/animal-selected.svg" alt="animal" fill />}
          <Image src={animal.image} alt="animal" width={size} height={size} />
        </button>
      ))}
    </AnimalList>
  );
}

export default SelectAnimals;

const AnimalList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  &::-webkit-scrollbar {
    width: 2px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2b2b2b8b;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }

  button {
    position: relative;
    z-index: 1;
  }
`;

const SelectedImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;
