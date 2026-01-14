import type { ComponentProps } from 'react';
import type { PersonaInfo } from '@gitanimals/api';
import { CardBack, GameCard, type CardTierType } from '@gitanimals/ui-tailwind';

import { getAnimalTierInfo } from '@/utils/animals';
import { getPersonaImage } from '@/utils/image';

interface AnimalCardProps extends Partial<PersonaInfo> {
  type: string;
  dropRate: string;
}

function AnimalCard(props: AnimalCardProps) {
  props.type.includes('WHITE') && console.log('props', props);
  const tier = getAnimalTierInfo(Number(props.dropRate.replace('%', '')));

  if (props.grade === 'EVOLUTION') {
    return (
      <GameCard
        tier="EVOLUTION"
        title={props.type}
        percentage={props.dropRate}
        imageUrl={getPersonaImage(props.type)}
        size="responsive"
      />
    );
  }

  return (
    <GameCard
      tier={tier}
      title={props.type}
      percentage={props.dropRate}
      imageUrl={getPersonaImage(props.type)}
      size="responsive"
    />
  );
}

export function AnimalCardBack({ tier = 'S_PLUS' }: ComponentProps<typeof CardBack> & { tier?: CardTierType }) {
  return <CardBack tier={tier} />;
}

export default AnimalCard;
