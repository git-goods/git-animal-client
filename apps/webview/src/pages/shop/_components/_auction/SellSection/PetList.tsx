import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Banner } from '@gitanimals/ui-tailwind';
import { cn } from '@gitanimals/ui-tailwind/utils';
import { useQuery } from '@tanstack/react-query';

import { customScrollStyle } from '@/styles/scrollStyle';
import { getPersonaImage } from '@/utils/image';
import { useUser } from '@/hooks/useUser';

interface Props {
  selectedPersona?: Persona | null;
  onProductClick: (product: Persona) => void;
}

const listContainerStyle =
  'flex max-h-[582px] flex-wrap gap-1 overflow-y-scroll max-mobile:max-h-[347px]';

function PetList(props: Props) {
  const { username } = useUser();

  const { data } = useQuery(userQueries.allPersonasOptions(username));

  const personas = data?.personas || [];

  return (
    <div className={cn(listContainerStyle, customScrollStyle)}>
      {personas.map((persona) => {
        return (
          <button key={persona.id} type="button" onClick={() => props.onProductClick(persona)}>
            <Banner
              size="small"
              status={props.selectedPersona?.id === persona.id ? 'selected' : 'default'}
              image={<img src={getPersonaImage(persona.type)} width={52} height={52} alt={persona.type} />}
            />
          </button>
        );
      })}
    </div>
  );
}

export default PetList;
