'use client';

import { MediaQuery } from '@/shared/ui/MediaQuery';

import { CardList, MobileCardList } from '../(common)/CardList';

import { ChristmasCard } from './ChristmasCard';

const PERSONA = [
  'SNOWMAN',
  'DESSERT_FOX_RUDOLPH',
  'LITTLE_CHICK_SANTA',
  'RABBIT_BROWN_RUDOLPH',
  'SNOWMAN_MELT',
  'HAMSTER_SANTA',
];

export function ChristmasCardList() {
  return (
    <MediaQuery
      mobile={<MobileCardList renderCard={(type) => <ChristmasCard type={type} />} persona={PERSONA} />}
      desktop={<CardList persona={PERSONA} renderCard={(type) => <ChristmasCard type={type} />} />}
    />
  );
}
