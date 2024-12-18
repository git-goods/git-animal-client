'use client';

import { MediaQuery } from '@/components/MediaQuery';

import { CardList, MobileCardList } from '../(common)/CardList';

import { HalloweenCard } from './HalloweenCard';

const PERSONA = ['GHOST_KING', 'GHOST', 'SCREAM', 'SCREAM_GHOST', 'SLIME_PUMPKIN_1', 'SLIME_PUMPKIN_2']; //  ''

export function HalloweenCardList() {
  return (
    <MediaQuery
      mobile={<MobileCardList renderCard={(type) => <HalloweenCard type={type} />} persona={PERSONA} />}
      desktop={<CardList persona={PERSONA} renderCard={(type) => <HalloweenCard type={type} />} />}
    />
  );
}
