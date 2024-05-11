/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import styled from 'styled-components';

import { STATIC_IMAGE_URL } from '@/constants/outlink';
import type { PetInfoSchema } from '@/schema/user';

interface Props {
  selectedList: PetInfoSchema[];
  setSelected: (persona: PetInfoSchema) => void;
  size?: number;
  personaList: PetInfoSchema[];
}

function SelectAnimalList({ selectedList, setSelected, personaList, size = 196 }: Props) {
  const animals = personaList.map((persona) => ({
    key: persona.type,
    image: `${STATIC_IMAGE_URL}/${persona.type}`,
    ...persona,
  }));

  return (
    <AnimalList>
      {animals.map((animal) => {
        const isSelected = selectedList.find((selected) => selected.type === animal.key);
        return (
          <Item
            key={animal.key}
            onClick={() => setSelected(animal)}
            size={size}
            style={{
              filter: isSelected ? 'brightness(0.5)' : 'brightness(1)',
            }}
          >
            {/* {isSelected && <SelectedImage src="/animals/animal-selected.svg" alt="animal" fill />} */}
            <img className="animal" src={animal.image} alt="animal" width={size} height={size} />
          </Item>
        );
      })}
    </AnimalList>
  );
}

export default SelectAnimalList;

const Item = styled.button<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  min-width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: flex;
  justify-content: center;
  align-items: center;

  .animal {
    position: absolute;
    left: 0;
    height: 100%;
    object-fit: contain;
  }
`;

const AnimalList = styled.ul`
  display: flex;
  max-width: 100%;
  width: 1000px;
  overflow-x: auto;

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
