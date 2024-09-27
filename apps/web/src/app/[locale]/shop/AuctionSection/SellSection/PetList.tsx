import Image from 'next/image';
import { css, cx } from '_panda/css';

import { useGetAllPets } from '@/apis/user/useGetAllPets';
import type { PetInfoSchema } from '@/schema/user';
import { useClientUser } from '@/utils/clientAuth';
import { getPersonaImage } from '@/utils/image';

interface Props {
  selectedPersona?: PetInfoSchema | null;
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
            <Image src={getPersonaImage(persona.type)} width={82} height={82} alt={persona.type} />
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
  maxHeight: '582px',
  overflowY: 'scroll',
  gap: 4,
});

const petItemContainerStyle = css({
  cursor: 'pointer',
  width: '80px',
  height: '80px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 12,
  backgroundColor: 'white_10',
  border: '2px solid transparent',

  '&.isSelected': {
    border: '2px solid',
    borderColor: 'white_50',
    backgroundColor: 'white_25',
  },

  transition: 'border 0.3s, background-color 0.3s',
});
