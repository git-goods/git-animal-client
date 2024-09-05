/* eslint-disable @next/next/no-img-element */
import { css, cx } from '_panda/css';

import { useGetAllPets } from '@/apis/user/useGetAllPets';
import type { PetInfoSchema } from '@/schema/user';
import { useClientUser } from '@/utils/clientAuth';
import { getPersonaImage } from '@/utils/image';

interface Props {
  selectedPersona?: PetInfoSchema;
  onProductClick: (product: PetInfoSchema) => void;
}

function PetList(props: Props) {
  const { name: username } = useClientUser();

  const { data } = useGetAllPets(username);

  const personas = data?.personas || [];

  return (
    <div className={listContainerStyle}>
      {personas.map((persona) => {
        return (
          <button
            className={cx(petItemContainerStyle, props.selectedPersona?.id === persona.id && 'isSelected')}
            key={persona.id}
            onClick={() => props.onProductClick(persona)}
          >
            <img
              src={getPersonaImage(persona.type)}
              width={82}
              height={82}
              alt={persona.type}
              // className={css({ noSelect: 'true' })}
            />
          </button>
        );
      })}
    </div>
  );
}

export default PetList;

const listContainerStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  maxHeight: '534px',
  overflowY: 'auto',
});

const petItemContainerStyle = css({
  backgroundImage: 'url(/shop/pet-box-bg.svg)',
  width: '80px',
  height: '80px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundPosition: 'center',

  '&.isSelected': {
    filter: 'brightness(0.7)',
  },

  cursor: 'pointer',
  transition: 'filter 0.3s',
});
