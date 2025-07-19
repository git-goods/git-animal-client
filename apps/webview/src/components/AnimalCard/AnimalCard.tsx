import type { ComponentProps } from 'react';
import { CardBack, GameCard } from '@gitanimals/ui-panda';
import type { CardTierType } from '@gitanimals/ui-panda/src/components/Card/constants';

import { getAnimalTierInfo } from '@/utils/animals';
import { getPersonaImage } from '@/utils/image';

interface AnimalCardProps {
  type: string;
  dropRate: string;
}

function AnimalCard(props: AnimalCardProps) {
  const tier = getAnimalTierInfo(Number(props.dropRate.replace('%', '')));

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
