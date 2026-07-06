import Image from 'next/image';
import type { Persona } from '@gitanimals/api';
import { useIsMobile } from '@gitanimals/react';
import { userQueries } from '@gitanimals/react-query';
import { Banner, cn } from '@gitanimals/ui-tailwind';
import { useQuery } from '@tanstack/react-query';

import { customScrollStyle } from '@/styles/scrollStyle';
import { useClientUser } from '@/hooks/clientAuth';
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
    <div className={cn(listContainerStyle, customScrollStyle)}>
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

const listContainerStyle = 'flex flex-wrap max-h-[582px] overflow-y-scroll gap-[4px] mobile:max-h-[347px]';
