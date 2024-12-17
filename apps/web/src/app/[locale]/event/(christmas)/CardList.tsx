'use client';

import { css } from '_panda/css';

import { CardList, MobileCardList } from '../(common)/CardList';

import { ChristmasCard } from './ChristmasCard';
import { OnlyDesktop, OnlyMobile } from '_panda/jsx';

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
    <>
      <OnlyMobile>
        <MobileCardList renderCard={(type) => <ChristmasCard type={type} />} persona={PERSONA} />
      </OnlyMobile>
      <OnlyDesktop>
        <CardList persona={PERSONA} renderCard={(type) => <ChristmasCard type={type} />} />
      </OnlyDesktop>
    </>
  );
}
