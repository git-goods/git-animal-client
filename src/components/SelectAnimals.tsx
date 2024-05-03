import Image from 'next/image';
import styled from 'styled-components';

const ANIMAL_LIST = [
  {
    key: '1',
    image: '/animals/Animals-1.png',
  },
  {
    key: '2',
    image: '/animals/Animals-2.png',
  },
  {
    key: '3',
    image: '/animals/Animals-3.png',
  },
  {
    key: '4',
    image: '/animals/Animals-4.png',
  },
  {
    key: '5',
    image: '/animals/Animals-5.png',
  },
  {
    key: '6',
    image: '/animals/Animals-6.png',
  },
  {
    key: '7',
    image: '/animals/Animals-7.png',
  },
];

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
