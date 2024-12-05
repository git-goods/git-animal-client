'use client';

import { css } from '_panda/css';

import { CardList, MobileCardList } from '../(common)/CardList';

import { ChristmasCard } from './ChristmasCard';

const PERSONA = ['GHOST_KING', 'GHOST', 'SCREAM', 'SCREAM_GHOST', 'SLIME_PUMPKIN_1', 'SLIME_PUMPKIN_2']; //  ''

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
