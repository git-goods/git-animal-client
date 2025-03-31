import { GameCard } from '@gitanimals/ui-panda';

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

export default AnimalCard;
