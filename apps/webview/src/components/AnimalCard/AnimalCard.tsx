import type { ComponentProps } from 'react';
import { CardBack, GameCard, type CardTierType } from '@gitanimals/ui-tailwind';

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

type CardBackTier = ComponentProps<typeof CardBack>['tier'];

function toCardBackTier(tier: CardTierType): CardBackTier {
  return tier === 'EVOLUTION' ? 'S_PLUS' : tier;
}

export function AnimalCardBack({ tier = 'S_PLUS' }: { tier?: CardTierType }) {
  return <CardBack tier={toCardBackTier(tier)} />;
}

export default AnimalCard;
