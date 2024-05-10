import Image from 'next/image';
import styled from 'styled-components';

import { convertPersonaTypeToImageName } from '@/utils/string';
import { STATIC_IMAGE_URL } from '@/constants/outlink';

interface Props {
  selected?: string;
  setSelected: (key: string) => void;
  size?: number;
  personList: {
    id: string;
    type: string;
    level: string;
  }[];
}

function SelectAnimal({ selected, setSelected, personList, size = 196 }: Props) {
  const animals = personList.map((person) => ({
    key: person.type,
    image: `/pets/${convertPersonaTypeToImageName(person.type)}.svg`,
  }));

  console.log('animals: ', animals);
  return (
    <AnimalList>
      {animals.map((animal) => (
        <Item key={animal.key} onClick={() => setSelected(animal.key)} size={size}>
          {selected === animal.key && <SelectedImage src="/animals/animal-selected.svg" alt="animal" fill />}
          <img className="animal" src={animal.image} alt="animal" />
        </Item>
      ))}
    </AnimalList>
  );
}

export default SelectAnimal;

const Item = styled.button<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: flex;
  justify-content: center;
  align-items: center;
  .animal {
    position: absolute;
    left: 0;
    /* left: 50%;
    transform: translateX(-50%); */
    /* top: 50%; */
    /* transform: translate(-50%, -50%); */
    height: 100%;
    object-fit: contain;
  }
`;

const AnimalList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

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
