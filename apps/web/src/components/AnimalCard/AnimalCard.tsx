import { Card } from '@gitanimals/ui-panda';

import { getAnimalTierInfo } from '@/utils/animals';
import { getPersonaImage } from '@/utils/image';

interface AnimalCardProps {
  type: string;
  dropRate: string;
}

function AnimalCard(props: AnimalCardProps) {
  const tier = getAnimalTierInfo(Number(props.dropRate.replace('%', '')));

  return <Card tier={tier} type={props.type} dropRate={props.dropRate} personaImage={getPersonaImage(props.type)} />;
}

export default AnimalCard;
