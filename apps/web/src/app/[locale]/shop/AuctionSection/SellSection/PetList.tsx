import Image from 'next/image';
import { css } from '_panda/css';
import { Banner } from '@gitanimals/ui-panda';

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
          <button key={persona.id} onClick={() => props.onProductClick(persona)}>
            <Banner
              size="small"
              selected={props.selectedPersona?.id === persona.id}
              image={<Image src={getPersonaImage(persona.type)} width={82} height={82} alt={persona.type} />}
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
  maxHeight: '582px',
  overflowY: 'scroll',
  gap: 4,
});
