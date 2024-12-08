'use client';

import { css } from '_panda/css';

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
    <>
      <div className={showMobile}>
        <MobileCardList renderCard={(type) => <ChristmasCard type={type} />} persona={PERSONA} />
      </div>
      <div className={showDesktop}>
        <CardList persona={PERSONA} renderCard={(type) => <ChristmasCard type={type} />} />
      </div>
    </>
  );
}

const showDesktop = css({
  display: 'block',

  '@media (max-width: 600px)': {
    display: 'none',
  },
});

const showMobile = css({
  display: 'none',
  '@media (max-width: 600px)': {
    display: 'block',
  },
});
