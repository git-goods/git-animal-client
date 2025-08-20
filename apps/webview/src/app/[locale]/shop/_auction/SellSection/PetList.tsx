import Image from 'next/image';
import { css, cx } from '_panda/css';
import type { Persona } from '@gitanimals/api';
import useIsMobile from '@gitanimals/react/src/hooks/useIsMobile/useIsMobile';
import { userQueries } from '@gitanimals/react-query';
import { Banner } from '@gitanimals/ui-panda';
import { useQuery } from '@tanstack/react-query';

import { customScrollStyle } from '@/styles/scrollStyle';
import { useClientUser } from '@/utils/clientAuth';
import { getPersonaImage } from '@/utils/image';

interface Props {
  selectedPersona?: Persona | null;
  onProductClick: (product: Persona) => void;
}

function PetList(props: Props) {
  const { name: username } = useClientUser();
  const isMobile = useIsMobile();

  const { data } = useQuery(userQueries.allPersonasOptions(username));

  const personas = data?.personas || [];

  return (
    <div className={cx(listContainerStyle, customScrollStyle)}>
      {personas.map((persona) => {
        return (
          <button key={persona.id} onClick={() => props.onProductClick(persona)}>
            <Banner
              size="small"
              status={props.selectedPersona?.id === persona.id ? 'selected' : 'default'}
              image={
                <Image
                  src={getPersonaImage(persona.type)}
                  width={isMobile ? 52 : 82}
                  height={isMobile ? 52 : 82}
                  alt={persona.type}
                />
              }
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
  gap: '4px',

  _mobile: {
    maxHeight: '347px',
  },
});
