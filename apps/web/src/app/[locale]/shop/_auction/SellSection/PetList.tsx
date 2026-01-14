import Image from 'next/image';
import type { Persona } from '@gitanimals/api';
import useIsMobile from '@gitanimals/react/src/hooks/useIsMobile/useIsMobile';
import { userQueries } from '@gitanimals/react-query';
import { cn } from '@gitanimals/ui-tailwind/utils';
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
    <div className={cn(
      'flex flex-wrap max-h-[582px] overflow-y-scroll gap-1',
      'max-mobile:max-h-[347px]',
      customScrollStyle
    )}>
      {personas.map((persona) => {
        const isSelected = props.selectedPersona?.id === persona.id;
        return (
          <button key={persona.id} onClick={() => props.onProductClick(persona)}>
            <div className={cn(
              'flex items-center justify-center rounded-lg border-2 border-transparent bg-white/10',
              isMobile ? 'w-[60px] h-[72px]' : 'w-[80px] h-[100px]',
              isSelected && 'border-brand-canary bg-white/20'
            )}>
              <Image
                src={getPersonaImage(persona.type)}
                width={isMobile ? 52 : 82}
                height={isMobile ? 52 : 82}
                alt={persona.type}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default PetList;
