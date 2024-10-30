/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { css } from '_panda/css';
import type { Persona } from '@gitanimals/api';

import { getPersonaImage } from '@/utils/image';

interface Props {
  selected?: Persona;
  setSelected: (persona: Persona) => void;
  size?: number;
  personaList: Persona[];
}

function SelectAnimal({ selected, setSelected, personaList, size = 196 }: Props) {
  const animals = personaList.map((persona) => ({
    key: persona.type,
    image: getPersonaImage(persona.type),
    ...persona,
  }));

  return (
    <ul className={animalListStyle}>
      {animals.map((animal) => (
        <button
          key={animal.key}
          onClick={() => setSelected(animal)}
          className={itemStyle}
          style={{
            width: `${size}px`,
            minWidth: `${size}px`,
            height: `${size}px`,
          }}
        >
          {selected?.type === animal.key && (
            <Image className={selectedImageStyle} src="/animals/animal-selected.svg" alt="animal" fill />
          )}
          <img className="animal" src={animal.image} alt="animal" width={size} height={size} />
        </button>
      ))}
    </ul>
  );
}

export default SelectAnimal;

const itemStyle = css({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& .animal': {
    position: 'absolute',
    left: 0,
    height: '100%',
    objectFit: 'contain',
  },
});

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
